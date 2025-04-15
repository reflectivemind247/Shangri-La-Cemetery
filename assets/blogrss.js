    var rssItems = [];

    function viewPost2(index) {
        let item = rssItems[index - 1];
        document.getElementById("viewDate").innerText = buildDate(item);
        document.getElementById("viewTitle").innerText = item.title;
        document.getElementById("viewContent").innerHTML = item.content;
        document.getElementById("viewImage").src = item.imageurl;
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
    
    function loadRssAsHtml(elId) {        
        fetch('https://reflectivemind247.github.io/Shangri-La-Cemetery/feed.xml') // Replace with your RSS feed URL
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {

            var items = data.querySelectorAll("entry");
            rssItems = [];

            let html = "<ul>";
            items.forEach(item => {
                let newItem =  { title: getRssData(item,'title'), created: getRssData(item,'published'), content: getRssData(item,'content'), imageurl: getRssData(item, 'imageurl') };

                rssItems.push(newItem);

                html += `<li class='blogListItem'><span class='blogItemDate'>${buildDate(newItem)}</span><span class='p button blogItemTitle'><a role='button' onclick='viewPost2(${rssItems.length});'><h3>${newItem.title}</h3></a></span><span class="p blogHighlight">${newItem.content.substring(0, 75).trimEnd()}...</span></li>`;
            });
            html += "</ul>";
            const t = window.setTimeout(() => {
                document.getElementById(elId).innerHTML = html; // Replace "rss-feed" with the ID of your target element
            }, 100);
        });
    }

    function getRssData(item, field) {
        try {
            return item.querySelector(field).textContent;
        }
        catch (e) {
            console.log("ERROR: getRssData: " + e.message);
        }
        return "";
    }
