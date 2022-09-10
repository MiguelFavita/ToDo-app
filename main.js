const form = document.querySelector("form")
form.addEventListener("submit", event => {
    event.preventDefault()
})

const buttonSendTask = document.querySelector(".btn-send-task")
buttonSendTask.addEventListener("click", checkTask)

let listTasks = []

const buttonClearAllTask = document.querySelector(".btn-clear-all-task")
buttonClearAllTask.addEventListener("click", () => {
    listTasks.length = 0
    removeErrorTask()
    const AllLi = document.querySelectorAll("li")
    AllLi.forEach(element => {
        element.style.display = "none"
    })
})

let ul = document.querySelector("ul")

function taskInList(task, list) {
    if (list.indexOf(task) !== -1) {
        return true
    } else {
        return false
    }
}

function focusInputTask() {
    taskType.focus()
}

const taskType = document.querySelector("#task-type")
focusInputTask()
let messageError = document.createElement("p")

function checkTask() {
    if (taskType.value === "" || taskInList(taskType.value, listTasks)) {
        messageError.innerHTML = "<font color='#ff0000'>Tarefa inválida ou já cadastrada na lista</font>"
        form.appendChild(messageError)
    } else {
        removeErrorTask()
        listTasks.push(taskType.value)
        focusInputTask()
        createTask()
    }
    taskType.value = ""

    function createTask() {
        let itemTask = document.createElement("li")
        let buttonDeleteTask = document.createElement("button")
        let input = document.createElement("input")
        input.setAttribute("type", "checkbox")
        buttonDeleteTask.innerHTML = "<i class='fas fa-trash icon-trash'></i>"

        itemTask.appendChild(input)
        itemTask.appendChild(document.createTextNode(taskType.value))
        itemTask.appendChild(buttonDeleteTask)
        ul.appendChild(itemTask)

        input.addEventListener("change", () => {
            removeTask()
            itemTask.classList.toggle("done")
            focusInputTask()
        })

        buttonDeleteTask.addEventListener("click", () => {
            removeTask()
            itemTask.style.display = "none"
            focusInputTask()
        })

        function removeTask() {
            let removeTaskSpecific = listTasks.indexOf(itemTask.value)
            listTasks.splice(removeTaskSpecific, 1)
        }
    }
}

function removeErrorTask() {
    messageError.innerHTML = ""
}