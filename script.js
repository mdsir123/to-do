let inputTask = document.querySelector("#input-task")
let setPriority = document.querySelector("select")
let clearBtn = document.querySelector(".clear")
let addBtn = document.querySelector(".add")

let cont = document.querySelector(".container")

let taskCount = document.querySelector(".task-count")

let count = 0;

// console.log(5)


document.querySelector(".util").addEventListener("click", function(event){
    let eventTarget = event.target
    if(eventTarget.classList[0] == "add"){
        add()
    } else if(eventTarget.classList[0] == "clear"){
        inputTask.value = ""
        setPriority.selectedIndex=0;
        return;
    } else return;
})



// .............ADD..BUTTON...FUNCTIONALITY.............................................................
let add = function(){

    // .............ADDING..TASK...FUNCTIONALITY.............................................................
    let text = inputTask.value
    if(text == "" ) return;

    inputTask.value = ""

    let task = document.createElement("div")
    task.innerHTML = `<div class="border task c-m flex">
        <input type="checkbox" name="" id="checkbox">
        <span class="border checkmark"></span>
        <div class="border content">
            <p>${text}</p></div>
        <svg id="edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 18.89H6.41421L15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89ZM21 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L9.24264 18.89H21V20.89ZM15.7279 6.74785L17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785Z"></path></svg>
        <svg id="delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z"></path></svg>
    </div>`


    // .............PRIORITY...FUNCTIONALITY.............................................................


    if(setPriority.value == "high"){
        task.classList.add("high-prior")
    }else if(setPriority.value == "medium"){
        task.classList.add("med-prior")
    }else{
        task.classList.add("low-prior")
        // task.firstChild.border="2px solid black";
    }

    // console.dir(task.firstChild);



    // .............TASK..COUNT...FUNCTIONALITY.............................................................
    let setTaskCount = function(){
        taskCount.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z"></path></svg>
        Tasks Today : ${count}`
    }


        // .............CHECKBOX...FUNCTIONALITY.............................................................
    let taskCheck = task.querySelector("#checkbox");

    let checkfn = function(){
        if(taskCheck.checked){
            task.firstChild.classList.add("task-done")
            count--;
            setTaskCount();
        }else{
            task.firstChild.classList.toggle("task-done")
            count++;
            setTaskCount();
        }
        // task.firstChild.classList.toggle("task-done")
    }
    
    
        // .............DELETE...FUNCTIONALITY.............................................................
    let delIcon = task.querySelector("#delete");
    
    let delfn = function(){
        cont.removeChild(task)
        if(!taskCheck.checked){
            count--;
            setTaskCount();
        }
    }
    
        // delIcon.addEventListener("click", delfn)
    
    
    // .............EDIT...FUNCTIONALITY.............................................................
    
    let editIcon = task.querySelector("#edit");
    
    // EVENT 3
    // editIcon.addEventListener("click", function(){
    //     inputTask.value = text
    //     delfn();
    // })


    // EVENT DELEGATION.....................................................

    task.querySelector(".task").addEventListener("click", function(event){
        let eventTrgt = event.target;
        event.stopPropagation();
        // console.dir(eventTrgt)

        // if(eventTrgt.id == "delete" || eventTrgt.parentNode == "svg#delete"){
        if(eventTrgt.id == "delete"){
            delfn();
            console.log("YESSSSSSSSSSSSSSSS")
        }else if(eventTrgt.id == "edit"){
            inputTask.value = text
            delfn();
            console.log("NOOOOOOOOOOOOOOOOOOOO")
        }else if(eventTrgt.id == "checkbox"){
            checkfn()
            console.log("tickkkkkkkkkkkkkkkkkk")
        }else return;
    })


    // ................ARRANGE...ACC..TO...PRIORITY.........................................
 

    // low priority first child
    let lpfc = document.querySelector(".low-prior") 
    // console.dir(lpfc)


    // medium priority first child
    let mpfc = document.querySelector(".med-prior") 
    // console.dir(lpfc)

    if(setPriority.value == "high"){
        cont.insertBefore(task,cont.firstChild);
    }else if(setPriority.value == "medium"){
        cont.insertBefore(task,lpfc);
    }else{
        cont.append(task);
    }

    // console.dir(cont)
    // cont.insertBefore(task,cont.firstChild);
    setPriority.selectedIndex=0;
    count++;
    setTaskCount();

}


// .............ENTER..KEY...FUNCTIONALITY.............................................................
inputTask.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      add();
    }
});


// .............PRIORITY ENTER...FUNCTIONALITY.............................................................
setPriority.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      add();
    }
});


// .............ADD..BUTTON................................................................
// addBtn.addEventListener("click",add)


// .............CLEAR..BUTTON...FUNCTIONALITY.............................................................
// clearBtn.addEventListener("click", function(){
//     inputTask.value = ""
//     setPriority.selectedIndex=0;
//     return;
// })







