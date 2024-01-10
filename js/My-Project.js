function getDistanceTime(time) {
    const timeNow = new Date().getTime();
    const timePosted = new Date(time).getTime(); // convert input time to milliseconds

    const distance = timeNow - timePosted;

    const distanceSeconds = Math.floor(distance / 1000);
    const distanceMinutes = Math.floor(distance / 1000 / 60);
    const distanceHours = Math.floor(distance / 1000 / 60 / 60);
    const distanceDays = Math.floor(distance / 1000 / 60 / 60 / 24);

    if (distanceDays > 0) {
        return `${distanceDays} day${distanceDays > 1 ? 's' : ''} ago`;
    } else if (distanceHours > 0) {
        return `${distanceHours} hour${distanceHours > 1 ? 's' : ''} ago`;
    } else if (distanceMinutes > 0) {
        return `${distanceMinutes} minute${distanceMinutes > 1 ? 's' : ''} ago`;
    } else {
        return `${distanceSeconds} second${distanceSeconds > 1 ? 's' : ''} ago`;
    }
}


function durationInDays(startDate, endDate) {
    const oneDay = 1000 * 60 * 60 * 24;

    const startDateMs = new Date(startDate).getTime();
    const endDateMs = new Date(endDate).getTime();
    const durationMs = endDateMs - startDateMs;

    return Math.floor(durationMs / oneDay);
}

function durationInSeconds(startDate, endDate) {
    const oneSecond = 1000;

    const startDateMs = new Date(startDate).getTime();
    const endDateMs = new Date(endDate).getTime();
    const durationMs = endDateMs - startDateMs;

    return Math.floor(durationMs / oneSecond);
}

let dataMyProject = [];

function submitData(event) {
    event.preventDefault();
    const projectName = document.getElementById("inputMyProject");
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");
    const description = document.getElementById("inputContent");
    const technologies = document.querySelectorAll("input[type=checkbox]:checked");
    const image = document.getElementById("inputImage");
    const duration = document.getElementById("inputDuration")

    if (projectName === "" || startDate === "" || endDate === "" || description === "" || technologies === "" || image.length === 0) {
        alert("Please fill in all fields correctly!!!");
        return;
    }

    if (projectName && startDate && endDate && description && technologies && image && image.files.length > 0) {
        const projectNameValue = projectName.value;
        const startDateValue = startDate.value;
        const endDateValue = endDate.value;
        const descriptionValue = description.value;
        const technologiesValue = Array.from(technologies).map((tech) => tech.value);
        const imageValue = image.files[0];
        const durationValue = getDistanceTime(startDateValue, endDateValue);

        if (imageValue) {
            const imageUrl = URL.createObjectURL(imageValue);

            console.log(projectNameValue, startDateValue, endDateValue, descriptionValue, durationValue, technologiesValue, imageUrl);

            const MyProject = {
                title: projectNameValue, 
                content: descriptionValue,
                technologies: technologiesValue,
                image: imageUrl,
                duration: durationValue,
                postAt: new Date(),
                author: "Ravano Akbar Widodo"
            }

            dataMyProject.push(MyProject);
            console.log("dataMy-Project", dataMyProject)
            renderMyProject();
        }
    }
}

function renderMyProject() {
    const contentsElement = document.getElementById("contents");
    contentsElement.innerHTML = '';

    for (let index = 0; index < dataMyProject.length; index++) {
        contentsElement.innerHTML += `
        <div class="My-Project-list-item">
            <div class="My-Project-image">
                <img src="${dataMyProject[index].image}" alt="" />
            </div>
            <div class="My-Project-content">
                <div class="btn-group">
                    <button class="btn-edit">Edit Post</button>
                    <button class="btn-post">Delete Post</button>
                </div>
                <h1>
                    <a href="My-Project-detail.html" target="_blank">${dataMyProject[index].title}</a>
                </h1>
                <h3>Duration: ${dataMyProject[index].duration}</h3>
                <br>
                <div class="detail-My-Project-content">
                    ${dataMyProject[index].postAt} | ${dataMyProject[index].author}
                </div>
                <p style="text-align: center;">
                   ${dataMyProject[index].content}
                </p>
                <br>
                <div class="technologies">
                    <label>Technologies:</label>
                    <ul style="text-align: center; list-style: none; padding: 0;">
                        ${dataMyProject[index].technologies.map((tech) => `<li>${tech}</li>`).join('')}
                    </ul>
                </div>
                <div class="card-icons">
                     <i class="fa-brands fa-google-play fa-xl"></i>
                     <i class="fa-brands fa-android fa-xl"></i>
                     <i class="fa-brands fa-java fa-lg"></i>
                </div>
            </div>
        </div>`;
    }
}

setInterval(function() {
    renderMyProject()
}, 1000)