    var rssItems = [];

    function viewPost2(index) {
        let item = rssItems[index - 1];
        document.getElementById("viewDate").innerText = buildDate(item);
        document.getElementById("viewTitle").innerText = item.title;
        document.getElementById("viewContent").innerHTML = item.content;
//        document.getElementById("viewImage").src = item.querySelector("imageurl").textContent;
        document.getElementById("postView").classList.remove("hidden");
        document.getElementById("rss-feed").classList.add("hidden");
    }

    function closeBlogView() {
        document.getElementById("postView").classList.add("hidden");
        document.getElementById("rss-feed").classList.remove("hidden");
    }

    function buildDate(item) {
        var date = new Date(item.created);
        var today = new Date();

        let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        let month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
        let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

        if(today.getFullYear() == date.getFullYear()){
            return `${day} ${month}`;
        }

        return `${day} ${month} ${year}`;
    }

    function getRssAsHtml() {        
        fetch('https://reflectivemind247.github.io/Shangri-La-Cemetery/feed.xml') // Replace with your RSS feed URL
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {

            var items = data.querySelectorAll("entry");
            rssItems = [];

            let html = "<ul>";
            items.forEach(item => {
                let newItem =  { title: getRssData(item,'title'), created: getRssData(item,'published'), content: getRssData(item,'content') };

                rssItems.push(newItem);

                html += `<li class='blogListItem'><span class='blogItemDate'>${buildDate(newItem)}</span><span class='p button'><a role='button' onclick='viewPost2(${rssItems.length});'><h3>${newItem.title}</h3></a></span><span class="p">${newItem.content.substring(0, 50)}...</span></li>`;
            });
            html += "</ul>";
            return html;
//            document.getElementById("rss-feed").innerHTML = html; // Replace "rss-feed" with the ID of your target element
        });
    }

    function getRssData(item, field) {
        return item.querySelector(field).textContent;
    }
