const addtask=document.querySelector(".AddTask")
const Delete=document.querySelector(".Delete")
const edit=document.querySelector(".edit")
const input=document.querySelector(".todo-input")
const todolist=document.querySelector(".todo-list")
const pagination=document.querySelector(".pagination")
const todo=[]
const itemspage=3
let currentpage=1


//add tasks

addtask.addEventListener("click",() =>{
    const task=input.value.trim()
    if(task==="" ||!task){
        showErrorMessage("please enter a task") //دله خمعملها حااااليا تحت
        return
    }
    input.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        addtask.click(); // كأنه ضغط على زرار Add
    }
});

    todo.unshift(task); //نحط فى اول ال مصفوفه todo
    input.value=""
    currentpage=1; // يرجع الانبوت الى الصفر من غير كتابه
    renderTodos(); //هنعملها تحت 
    renderpagination();
});
function renderTodos(){
    //get task for current page
     todolist.innerHTML = "";
    const start=(currentpage-1)*itemspage;
    const end=start+itemspage
    const currenttodo=todo.slice(start,end)
    

    //render tasks
    currenttodo.forEach((task,index)=>{
        const li=document.createElement("li")
        li.className="todo-item"

        const taskText=document.createElement("span")
        taskText.className="todo-text"
        taskText.textContent = task;

        const editbtn=document.createElement("button")
        editbtn.className="edit"
        editbtn.textContent="Edit"
        editbtn.addEventListener("click",()=>{
            editTask(start+index,li,taskText) //داله جديدة
        })

         const dletebtn=document.createElement("button")
        dletebtn.className="Delete"
        dletebtn.textContent="Delete"
        dletebtn.addEventListener("click",()=>{
            delteTask(start+index) //داله جديدة
        })

        li.appendChild(taskText)
        li.appendChild(editbtn)
        li.appendChild(dletebtn)
        todolist.appendChild(li)
    })

}

function renderpagination(){
    pagination.innerHTML=""
    const totalpages=Math.ceil(todo.length/itemspage)

    for(let i=1;i<=totalpages;i++){
        const btn=document.createElement("button")
        btn.className="paginationBtn"
         btn.textContent = i
        btn.disabled=i===currentpage
        btn .addEventListener("click",()=>{
            currentpage=i
            renderTodos()
            renderpagination()
        })
        pagination.appendChild(btn)
    }
}

function editTask(index,li,taskText){
    //creat input for editing
    const inputedit=document.createElement("input")
    inputedit.type="text"
    inputedit.value=todo[index]
    inputedit.className="edit-input"

    // create a save btn
    const saveBtn=document.createElement("button")
    const deletebtn=document.createElement("button")
    saveBtn.className="save"
    deletebtn.className="Delete"
    saveBtn.textContent="Save"
    deletebtn.textContent="Delete"

    li.innerHTML=""
    li.appendChild(inputedit)
    li.appendChild(saveBtn)
    li.appendChild(deletebtn)
    saveBtn.addEventListener("click",()=>{
        const updatetask=inputedit.value.trim()
        if(updatetask !== ""){
            todo[index]=updatetask
            renderTodos()
        }
        else{
            showErrorMessage("Task cannot be empty")
        }
    })
    deletebtn.addEventListener("click", () => {
    delteTask(index);
});
}


function delteTask(index){
    todo.splice(index,1)
    if((currentpage-1)*itemspage >= todo.length){
        currentpage=Math.max(currentpage-1,1)
    }
    renderTodos() 
    renderpagination()
}
function showErrorMessage(message){
    const errormassage=document.querySelector(".error-message")
    errormassage.textContent=message
    errormassage.style.display="block"
    setTimeout(()=>{
        errormassage.style.display="none"
    },3000)
}