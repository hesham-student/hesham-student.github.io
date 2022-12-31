

/* Get Values for Insert User */
const userName = document.getElementById("username");
const realName = document.getElementById("name");
const dateOfBirth = document.getElementById("dateOfBirth");
const program = document.getElementById("program");
const phone = document.getElementById("phone");
const caption = document.getElementById("caption");
const formInfo = document.getElementById("formInfo");
const capGen = document.getElementById("capGen")
const submitBtn = document.getElementById("submit");
/* Get Values For Filtering & Sorting & convertJSON */
const progFilter = document.getElementById("progFilter");
const studentSort = document.getElementById("studentSort");
const table = document.getElementById("table");
const convertJson = document.getElementById("convertJson");
const jsonResult = document.getElementById("jsonResult");


let userInfo = []
let tempArr
/* Create Random Caption When Loading */
document.addEventListener("DOMContentLoaded", () => {
   let x = generateRandomLetter(5)
   capGen.innerText = x
   capGen.value = x
   userInfo = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []
   tempArr = userInfo
   if (userInfo.length > 0) {
      tableLayout(userInfo)
   }
})

/* Submiting For Insert User */
submitBtn.addEventListener('click', function (e) {
   e.preventDefault();
   console.log(validateUserInfo())
   if (validateUserInfo()) {
      createUser()
      tableLayout(userInfo)
      clearAllFields()
   } else {
      console.log("Not Well Work")
   }
})

/* Filtering Event */
progFilter.addEventListener("change", () => {
   let select = progFilter.value
   if (select === "all") {
      tableLayout(userInfo)
   } else {
      tempArr = userInfo.filter(item => item.program === select)
      tableLayout(tempArr)
   }
})

/* Sorting Event */
studentSort.addEventListener('change', () => {
   if (studentSort.value !== "") {
      if (studentSort.value === 'username') {
         tempArr = bubbleSort(tempArr, 'userId')
         tableLayout(tempArr)
      } else if (studentSort.value === 'name') {
         // tempArr = bubbleSort(tempArr, '')
      }
   }
})

/* Convert JSON */
convertJson.addEventListener('click', () => {
   let result
   if (tempArr.length === 0) {
      result = `<p>Your Json File Is Empty<p>`
   } else {
      result = `<pre>
            ${JSON.stringify(tempArr, undefined, 4)}
         </pre>`
      jsonResult.innerHTML = result
   }
})

function bubbleSort(array, sortType) {
   let swapped = true;
   do {
      swapped = false;
      for (let j = 0; j < array.length; j++) {
         if (array[j + 1] === undefined) {
            swapped = false
            break;
         }
         if (array[j][sortType] > array[j + 1][sortType]) {
            let temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
            swapped = true;
         }
      }
   } while (swapped);
   return array;
}


/* Generate Random Caption */
const generateRandomLetter = (length) => {
   var result = '';
   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
   }

   return result
}

/* Clear All Fields */
const clearAllFields = () => {
   userName.value = ""
   realName.value = ""
   dateOfBirth.value = ""
   program.value = ""
   phone.value = ""
   caption.value = ""
}

/* Regex For Date */
function isGoodDate(date) {
   var reGoodDate = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
   return reGoodDate.test(date);
}

/* Regex For UserName */
function isGoodUserName(username) {
   var reGoodName = /[A-Z]([a-z]+)_[0-9]/;
   return reGoodName.test(username)
}
function isGoodRealname(realName){
   var reGoodName = /^[\u0600-\u06FF\s]*$/;
   return reGoodName.test(realName)
}
function isGoodPhone(phone)
{
   var reGoodph=/^\d{10}$/
   return reGoodph.test(phone);
}
/* Validation Before Submit the user */
const validateUserInfo = () => {
   let boolValue = false
   if (caption.value && caption.value === capGen.value) {
      if (isGoodDate(dateOfBirth.value) && isGoodUserName(userName.value) && isGoodRealname(realName.value) && program.value && isGoodPhone(phone.value)) {
         boolValue = true
      }
   } else {
      console.log('Error Caption')
   }
   return boolValue
}

/* Create User and Store It in LocalStorage */
const createUser = () => {
   let userNumber = +`${userName.value.split("_")[1]}`

   let newStudent = {
      username: userName.value,
      userId: userNumber,
      realName: realName.value,
      dateOfBirth: dateOfBirth.value,
      program: program.value,
      phone: phone.value,
   }

   userInfo = [...userInfo, newStudent]

   tableLayout(userInfo)
   localStorage.setItem("students", JSON.stringify(userInfo))
}

const tableLayout = (userInfo) => {
   let result = `
      <tr>
         <th>متسلسل</th>
         <th>اسم المستخدم</th>
         <th>اسم الطالب</th>
         <th>البرنامج</th>
      </tr>
   `
   let trTable = userInfo.map((item, idx) => {
      const { username, realName, program } = item

      return `
         <tr>
            <td>${idx}</td>
            <td>${username}</td>
            <td>${realName}</td>
            <td>${program}</td>
         </tr>
      `
   }).join('')

   result += trTable
   table.innerHTML = result
}

