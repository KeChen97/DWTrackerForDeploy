function displayErr() {
  const msgDiv = document.querySelector("#messages");
  console.log(msgDiv);
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  console.log("urlParams", params.msg);
  if (params.msg) {
    msgDiv.style.display = "block";
    const content = msgDiv.querySelector("#content");
    content.innerHTML = params.msg;
  }
}

async function checkLoggedIn() {
  const res = await fetch("/getuser");
  //console.log("this is the res", res);
  const user = await res.json();
  //console.log("this is the user", user.user);

  const isAuthEmail = document.querySelector("#staticEmail");
  const isAuthPassword = document.querySelector("#inputPassword");
  const isAuthFName = document.querySelector("#staticFName");
  const isAuthLName = document.querySelector("#staticLName");
  //const isAuthDWPass = document.querySelector("#staticDWPass");

  if (user.user) {
    //console.log(user.user);
    isAuthEmail.value = user.user.email;
    isAuthPassword.value = user.user.password;
    isAuthPassword.style.border = "none";
    isAuthFName.value = user.user.fname;
    isAuthLName.value = user.user.lname;
  } else {
    isAuthEmail.value = "Not an Authenticated User";
    isAuthPassword.value = "*****";
    isAuthPassword.style.border = "none";
  }

  return user.user !== undefined;
}

function editUserInfo() {
  const fnameDiv = document.querySelector("#fname-div");
  const lnameDiv = document.querySelector("#lname-div");

  fnameDiv.innerHTML = `<input
                      type="text"
                      name="fname"
                      class="form-control"
                      id="staticFName"
                    />`;
  lnameDiv.innerHTML = `<input
                      type="text"
                      name="lname"
                      class="form-control"
                      id="staticLName"
                    />`;
}

editUserInfo;
displayErr();
checkLoggedIn();
