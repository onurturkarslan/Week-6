// Local Storage'dan verileri al
window.onload = function () {
    loadTasks();
};

// Yeni element eklemek için fonksiyon
function newElement() {
    let inputValue = document.getElementById("task").value;
    if (inputValue === "" || inputValue.trim() === "") {
        // Eğer boşsa hata ver
        showToast("error");
    } else {
        let li = document.createElement("li");
        let textNode = document.createTextNode(inputValue);
        li.appendChild(textNode);
        document.getElementById("list").appendChild(li);

        // Element için silme butonu ekle
        let span = document.createElement("span");
        let txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);

        // Yapıldı işaretleme
        li.onclick = function () {
            this.classList.toggle("checked");
            saveTasks(); // Local Storage'a kaydet
        };

        // Silme işlemi
        span.onclick = function () {
            this.parentElement.remove();
            saveTasks(); // Local Storage'a kaydet
        };

        showToast("success");
        saveTasks(); // Local Storage'a kaydet
    }
    document.getElementById("task").value = ""; // Inputu temizle
}

// Toast gösterme fonksiyonu
function showToast(type) {
    if (type === "success") {
        $('#liveToast.success').toast('show');
    } else if (type === "error") {
        $('#liveToast.error').toast('show');
    }
}

// Local Storage'a görevleri kaydetme
function saveTasks() {
    let listItems = document.querySelectorAll("#list li");
    let tasks = [];
    listItems.forEach((item) => {
        tasks.push({
            text: item.firstChild.nodeValue,
            done: item.classList.contains("checked"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Local Storage'dan görevleri yükleme
function loadTasks() {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        let tasks = JSON.parse(savedTasks);
        tasks.forEach(task => {
            let li = document.createElement("li");
            let textNode = document.createTextNode(task.text);
            li.appendChild(textNode);
            document.getElementById("list").appendChild(li);

            // Eğer tamamlandı olarak işaretlenmişse
            if (task.done) {
                li.classList.add("checked");
            }

            // Silme butonu ekle
            let span = document.createElement("span");
            let txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            li.appendChild(span);

            // Yapıldı işaretleme
            li.onclick = function () {
                this.classList.toggle("checked");
                saveTasks(); // Local Storage'a kaydet
            };

            // Silme işlemi
            span.onclick = function () {
                this.parentElement.remove();
                saveTasks(); // Local Storage'a kaydet
            };
        });
    }
}
