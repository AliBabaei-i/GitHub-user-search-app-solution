const changeTheme = document.getElementById("change-theme");
const url = "https://api.github.com/users/";
const theme = window.localStorage.getItem("data-theme");
const rootElement = document.documentElement;

const switchTheme = () => {
    const dataTheme = rootElement.getAttribute("data-theme");
    const newTheme = dataTheme === "light" ? "dark" : "light";
    rootElement.setAttribute("data-theme", newTheme);
    if (newTheme == "dark") {
        document.querySelector("#light").style.display = "flex";
        document.querySelector("#dark").style.display = "none";
        window.localStorage.setItem("data-theme", "dark");
        return;
    }
    document.querySelector("#light").style.display = "none";
    document.querySelector("#dark").style.display = "flex";
    window.localStorage.setItem("data-theme", "light");
};

let executed = false;

function myFunction() {
    if (!executed) {
        if (theme == "dark") {
            rootElement.setAttribute("data-theme", "dark");
            document.querySelector("#light").style.display = "flex";
            document.querySelector("#dark").style.display = "none";
            window.localStorage.setItem("data-theme", "dark");
        } else if (theme == "light") {
            rootElement.setAttribute("data-theme", "light");
            document.querySelector("#light").style.display = "none";
            document.querySelector("#dark").style.display = "flex";
            window.localStorage.setItem("data-theme", "light");
        }
        executed = true;
    }
}

document.addEventListener("DOMContentLoaded", myFunction);
changeTheme.addEventListener("click", switchTheme);

const input = document.querySelector("#input");
const submit = document.querySelector("#btn");

input.addEventListener("input", (e) => {
    e.preventDefault();
});
input.addEventListener("click", (e) => {
    e.preventDefault();
});
document.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();
});
submit.addEventListener("click", (e) => {
    e.preventDefault();
});

const notFound = () => {
   document.querySelector("#error").style.visibility = "visible";
    document.querySelector("#username").innerHTML = "@octocat";
    document.querySelector("#name").innerHTML = `The Octocat`;
    document.querySelector("#avatar").src = "./assets/Oval.svg";
    document.querySelector("#bio").style.direction = "ltr";
    document.querySelector("#bio").innerHTML = "This user has no bio.";
    document.querySelector("#followers").innerHTML = "0";
    document.querySelector("#following").innerHTML = "0";
    document.querySelector("#repo").innerHTML = "0";
    document.querySelector("#input").placeholder = "";
    document.querySelector("#acompany").innerHTML = "@github";
    document.querySelector("#acompany").href = "#";
    document.querySelector("#location").innerHTML = "San Francisco";
    document.querySelector("#location").href = "#";
    document.querySelector("#awebsite").innerHTML = "https://github.blog";
    document.querySelector("#awebsite").href = "https://github.blog";
};
async function getUser() {
    await fetch(url + input.value)
        .then((response) => {
            if (!response.ok) {
                if (response.status === 404) {
                    notFound();
                    throw new Error("Data not found");
                } else if (response.status === 500) {
                    notFound();
                    throw new Error("Server error");
                } else if (response.status === 403) {
                    notFound();
                    alert("need vpn to load data");
                    throw new Error("need vpn to load data");
                } else {
                    notFound();
                    throw new Error("Network response was not ok");
                }
            }
            document.querySelector("#error").style.visibility = "hidden";
            return response.json();
        })
        .then((data) => {
            document.querySelector("#name").innerHTML = `${data.login}`;
            document.querySelector("#username").innerHTML = `@${data.login}`;
            document.querySelector("#bio").innerHTML = data.bio;
            if (data.bio == "" || data.bio == null) {
                document.querySelector("#bio").innerHTML =
                    "This user has no bio.";
            }
            document.querySelector("#followers").innerHTML = data.following;
            document.querySelector("#following").innerHTML = data.followers;
            document.querySelector("#repo").innerHTML = data.public_repos;
            document.querySelector("#avatar").src = data.avatar_url;
            const date = data.created_at;
            const dateArray = date.split("-", 4);
            if (dateArray[1] == "01") {
                var month = "Jan";
            }
            if (dateArray[1] == "02") {
                var month = "Feb";
            }
            if (dateArray[1] == "03") {
                var month = "Mar";
            }
            if (dateArray[1] == "04") {
                var month = "Apr";
            }
            if (dateArray[1] == "05") {
                var month = "May";
            }
            if (dateArray[1] == "06") {
                var month = "Jun";
            }
            if (dateArray[1] == "07") {
                var month = "Jul";
            }
            if (dateArray[1] == "08") {
                var month = "Aug";
            }
            if (dateArray[1] == "09") {
                var month = "Sep";
            }
            if (dateArray[1] == "10") {
                var month = "Jan";
            }
            if (dateArray[1] == "11") {
                var month = "Oct";
            }
            if (dateArray[1] == "12") {
                var month = "Nov";
            }
            document.querySelector(
                "#join-date"
            ).innerHTML = `Joined ${month} ${dateArray[0]}`;

            if (data.company == null || data.company == "") {
                document.querySelector(
                    "#acompany"
                ).innerHTML = `@${data.login}`;
                document.querySelector(
                    "#acompany"
                ).href = `https://github.com/${data.login}`;
            } else {
                document.querySelector("#acompany").innerHTML = data.company;
                document.querySelector("#acompany").href = data.html_url;
            }

            if (data.location == null || data.location == "") {
                document.querySelector("#location").innerHTML = "Not Available";
                document.querySelector("#location").style.opacity = "0.5";
                document.querySelector("#location-img").style.opacity = "0.5";
            } else {
                document.querySelector(
                    "#location"
                ).innerHTML = `${data.location}`;
                document.querySelector("#location").style.opacity = "1";
                document.querySelector("#location-img").style.opacity = "1";
            }
            if (data.twitter_username == null || data.twitter_username == "") {
                document.querySelector("#twitter").innerHTML = "Not Available";
                document.querySelector("#twitter-img").style.opacity = "0.5";
                document.querySelector("#twitter").style.opacity = "0.5";
            } else {
                document.querySelector("#twitter").innerHTML =
                    data.twitter_username;
                document.querySelector("#twitter").style.opacity = "1";
                document.querySelector("#twitter").style.color =
                    "var(--Dark-Gray)";
                document.querySelector("#twitter-img").style.color =
                    "var(--Dark-Gray)";
                document.querySelector("#twitter-img").style.opacity = "1";
            }
            if (data.blog == null || data.blog == "") {
                document.querySelector("#awebsite").innerHTML = "Not Available";
                document.querySelector("#awebsite").href = "#";
                document.querySelector("#website-img").style.opacity = "0.5";
                document.querySelector("#awebsite").style.opacity = "0.5";
                // document.querySelector("#website").style.opacity = "0.5";
                const web = document.querySelector("#website");
                web.querySelector("div.items.website a").href = "#";
                web.querySelector("div.items.website a").style.opacity = "0.5";
            } else {
                document.querySelector("#awebsite").innerHTML = data.blog;
                const web = document.querySelector("#website");
                web.querySelector("div.items.website a").href = data.blog;
                document.querySelector("#awebsite").style.opacity = "1";
                document.querySelector("#website-img").style.opacity = "1";
            }
        });
}
