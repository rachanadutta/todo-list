document.addEventListener('DOMContentLoaded', () =>{
    const todoInput=document.getElementById("task-input");
const addButton=document.getElementById("add");
const todoList=document.getElementById("task-list");
let tasks=JSON.parse(localStorage.getItem('tasks')|| '[]');
function addTask(text){
    const task={
        id: Date.now(),
        text: text,
        completed: false
    }
    tasks.push(task);
    saveTasks();
    render();
}
function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function render(){
    todoList.innerHTML = '';
    tasks.forEach(task => {
        const li=document.createElement("li");
        const checkbox=document.createElement("input");
        checkbox.type="checkbox";
        checkbox.checked=task.completed;
        
        
        //checkbox event
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            li.classList.toggle("completed", task.completed);
            render();
        });
        
        //span creation
        const span=document.createElement("span");
        span.textContent=task.text;
        const left = document.createElement("div");
    left.className = "left-side"; // We'll style this in CSS
    left.appendChild(checkbox);
    left.appendChild(span);
    

        //delete
        const delBtn= document.createElement("button");


        delBtn.innerHTML='<i class="ri-delete-bin-5-line"></i>';
        delBtn.addEventListener("click", () => {
            console.log("Delete button clicked for task:", task);
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            render();
        });
        //edit
        const editBtn= document.createElement("button");
        editBtn.classList.add("edit-btn");
        
        editBtn.innerHTML='<i class="ri-edit-2-line"></i>';
        editBtn.addEventListener("click", () => {
            console.log("Edit button clicked for task:", task);
            const input= document.createElement("input");
            input.classList.add("edit-input");
            input.type="text";
            input.value = task.text;
            left.replaceChild(input, span);
            input.addEventListener("keydown", (e)=>{
                if(e.key === "Enter"){
                    task.text=input.value.trim();
                    if(task.text === '') {
                        tasks = tasks.filter(t => t.id !== task.id);
                    } else {
                        saveTasks();
                        render();
                    }
                }
                if(e.key === "Escape") {
                    left.replaceChild(span, input);
                }
            })
        })
        const right = document.createElement("div");
    right.className = "right-side"; // We'll style this in CSS
    right.appendChild(editBtn);
        right.appendChild(delBtn);
        if (task.completed) {
    span.style.textDecoration = "line-through";
}      

  //adding everything to list
        li.appendChild(left);
        li.appendChild(right);
        
        todoList.appendChild(li);
    })
    const total = tasks.length;
const completed = tasks.filter(t => t.completed).length;
const percent = total === 0 ? 0 : (completed / total) * 100;

    document.querySelector('.progress-percent').textContent = `${Math.round(percent)}%`;
document.querySelector('.progress-done').textContent = completed;
document.querySelector('.progress-total').textContent = total;
document.querySelector('.progress-bar-fill').style.width = `${percent}%`;

    
}
todoInput.addEventListener("keydown", (e) =>{
    if(e.key === "Enter"){
        const taskText=todoInput.value.trim();
        if(taskText === '')return;
        addTask(taskText);
        todoInput.value='';
    }
})
addButton.addEventListener("click", () => {
    const taskText=todoInput.value.trim();
    if(taskText === '')return;
        addTask(taskText);
        todoInput.value='';
})

render();

})
