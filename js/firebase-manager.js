var user = {
    id: "",
    init: function () {
        if (!Cookies.get("FOODALITE_USER_ID")) {
            this.id = parseInt(Math.random() * 100000)
            Cookies.set("FOODALITE_USER_ID", this.id);
        } else {
            this.id = Cookies.get("FOODALITE_USER_ID");
        }
    }
}


var reader = new FileReader();

var config = {
    apiKey: "AIzaSyB6LLgtF39Y1pO_C8fXvmKr3xMk_yONtzk",
    authDomain: "foodalite-860f6.firebaseapp.com",
    databaseURL: "https://foodalite-860f6.firebaseio.com",
    projectId: "foodalite-860f6",
    storageBucket: "foodalite-860f6.appspot.com",
    messagingSenderId: "693768617196"
};

function upload() {
    var message = reader.result;
    fbManager.storage_ref.putString(message, 'data_url').then(function (snapshot) {
        var url = snapshot.downloadURL;
        fbManager.setDatabaseRef();
        
        now = new Date(Date.now());

        fbManager.database_ref.push({
            "url": url,
            "day": now.getUTCDate() - 1,
            "month": now.getUTCMonth() + 1,
            "year": now.getUTCFullYear(),
            "timestamp": Date.now()
        }).then(function () {
            window.location.href = "index.html";
        });
    });
}

var fbManager = {
    storage: "",
    database: "",
    storage_ref: "",
    database_ref: "",
    img_path: "images/",

    setStorageRef: function () {
        var path = this.img_path + user.id + '/' + Date.now();
        this.storage_ref = this.storage.child(path);
    },

    setDatabaseRef: function () {
        var path = user.id + '/';
        this.database_ref = this.database.child(path);
    },

    downloadImages: function (userId) {
        var path = userId + '/';
        var ref = this.database.child(path);

        ref.once('value').then(function (snapshot) {
            snapshot.forEach(function (child) {
                var ref = firebase.storage().refFromURL(child.val().url);
                ref.getDownloadURL().then(function (url) {
                    var xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.open('GET', url);
                    xhr.send();
                    setGallery(url);
                });               
            });
        })
    },

    init: function () {
        firebase.initializeApp(config);
        this.storage = firebase.storage().ref();
        this.database = firebase.database().ref();
    }
}

user.init();
fbManager.init();