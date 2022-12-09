//유저가 값을 입력한다.
//+버튼을 클릭하면, 할일이 추가된다.
//delete 버튼을 누르면 할일이 삭제된다.
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다.
//진행중 끝남 탭을 누르면, 언더바가 이동한다.
//끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
//전체탭을 누르면 다시 전체아이템으로 돌아옴

//입력창
let taskInput = document.getElementById("task-input");
//추가 버튼 (+)
let addButton = document.getElementById("add-button");

let tabs = document.querySelectorAll(".task-tabs div");

//할일리스트 저장하는 배열
let taskList = [];

let mode = '';

//추가버튼 이벤트 리스너
addButton.addEventListener("click", addTask);

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)})
}

function addTask(){
    let task = {
        id: uniqueId(),
        taskContent: taskInput.value,
        isComplete:false
    }
    taskList.push(task);
    console.log(taskList);
    render();
}

//할일 리스트에 할일 추가하는 함수
function render() {
    let resultHTML = "";
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].isComplete == true){
            resultHTML += `<div class="task-true">
            <div class="task-done">${taskList[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                <button onclick="deleteButton('${taskList[i].id}')">Delete</button>
            </div>
        </div>`;
        }else{
            resultHTML += `<div class="task-false">
            <div>${taskList[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                <button onclick="deleteButton('${taskList[i].id}')">Delete</button>
            </div>
        </div>`;
        }
    }
    //task-board에 HTML 코드를 추가한다.
    document.getElementById("task-board").innerHTML = resultHTML;
}

//check 버튼 누르면 완료된 일정을 바꾸기
function toggleComplete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            // if(taskList[i].isComplete == false){
            //     taskList[i].isComplete = true;
            // }else{
            //     taskList[i].isComplete = false;
            // }

            //위의 코드 줄인 문장 머리가 띵했음
            taskList[i].isComplete = !taskList[i].isComplete;

            break;
        }
    }
    console.log(taskList);
    render();
}

//유니크한 아이디 값을 주는 방법
var uniqueId = (function(){
    var id=0;
    return function(){ return id++;}
})();

function deleteButton(id){
    console.log(id);
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
           //console.log(taskList.indexOf(taskList[i]));
           taskList.splice(taskList.indexOf(taskList[i]), 1);
            break;
        }
    }
    render();
}

function filter(event){
    mode = event.target.id;

    if(mode == "all"){
        render();
    }else if(mode == "ongoing"){
        for(let i=0; i<taskList.length; i++){
            if(taskList.isComplete == true){
                resultHTML += `<div class="task-true">
                <div class="task-done">${taskList[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                    <button onclick="deleteButton('${taskList[i].id}')">Delete</button>
                </div>
            </div>`;
            }
        }
        document.getElementById("task-board").innerHTML = resultHTML;
    }else{
        for(let i=0; i<taskList.length; i++){
            if(taskList.isComplete == false){
                resultHTML += `<div class="task-false">
                <div>${taskList[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                    <button onclick="deleteButton('${taskList[i].id}')">Delete</button>
                </div>
            </div>`;
            }
        }
        document.getElementById("task-board").innerHTML = resultHTML;
    }
}