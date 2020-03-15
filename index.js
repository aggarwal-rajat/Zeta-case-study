$(document).ready(function () {
    // Create the hash to check duplicacy
    let hashMap = {};

    function loadData(number) {
        for (var i = 0; i < number; i++) {
            getCatImage();
            getDogImage();
            getFoxImage();
        }
    }

    function getCatImage() {
        $.get("https://aws.random.cat/meow", function (data, status) {
            const imageUrl = data.file;
            if (hashMap[imageUrl] && isValidImageURL(imageUrl)) {
                console.log("duplicate")
            } else if (isValidImageURL(imageUrl)) {
                hashMap[imageUrl] = true;
                $('#photos').append(`<img src="${imageUrl}">`);
            } else {
                console.log("invalid url")
            }

        });
    }
    function getDogImage() {
        $.get("https://random.dog/woof.json", function (data, status) {
            const imageUrl = data.url;
            if (hashMap[imageUrl] && isValidImageURL(imageUrl)) {
                console.log("duplicate");
            } else if (isValidImageURL(imageUrl)) {
                hashMap[imageUrl] = true;
                $('#photos').append(`<img src="${imageUrl}">`);
            } else {
                console.log("invalid url")
            }

        });
    }
    function getFoxImage() {
        $.ajax({
            url: "https://randomfox.ca/floof/",
            type: "GET",
            data: "",
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            beforeSend: function (xhr) { xhr.setRequestHeader('Access-Control-Allow-Origin', '*'); },
            success: function (data) {
                const imageUrl = data.image;
                if (hashMap[imageUrl]) {
                    console.log("duplicate")
                } else if (isValidImageURL(imageUrl)) {
                    hashMap[imageUrl] = true;
                    $('#photos').append(`<img src="${imageUrl}">`);
                } else {
                    console.log("invalid url")
                }

            }
        });
    }

    $(window).scroll(function () {
        var position = $(window).scrollTop();
        var bottom = $(document).height() - $(window).height();
        // check scroll reached near to end
        if (position >= bottom - 20) {
            // load more data.
            loadData(3);
        }

    });
    function isValidImageURL(str) {
        if (typeof str !== 'string') return false;
        return !!str.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp)$/gi);
    }

    // Load initial Data
    loadData(5);
});