let cartItem = JSON.parse(localStorage.getItem("cart")) || [];
    Display(cartItem);
    function Display() {
        let totalPrice = 0;
        let totalitem = 0;
        let Div = document.createElement("div");
        Div.setAttribute("id", "container");
        cartItem.forEach(function (element, index) {
            totalPrice += Number(element.price);
            totalitem++;
            let cdiv = document.createElement("div");
            let IMG = document.createElement("img");
            IMG.src = element.image_url;
            let Name = document.createElement("p");
            Name.innerText = element.name;
            let Price = document.createElement("h3");
            Price.innerText = element.price;
            let Offprice = document.createElement("p");
            Offprice.innerText = element.strikedoffprice;
            let Button = document.createElement("button");
            Button.innerText = "Remove";
            Button.style.backgroundColor = "red";
            Button.style.color = "white";
            Button.addEventListener("click", function () {
                deletefun(element.productId);
            });
            let Incre = document.createElement("button");
            Incre.setAttribute("class", "counter");
            Incre.innerText = "+";
            Incre.addEventListener("click", function () {
                increment(element.productId);
            })
            let Decre = document.createElement("button");
            Decre.setAttribute("class", "counter");
            Decre.innerText = "-";
            Decre.addEventListener("click", function () {
                decrement(element.productId);
            })
            let res = document.createElement("h5");
            res.innerText = 1;
            cdiv.append(IMG, Name, Price, Offprice, Decre, res, Incre, Button)
            Div.append(cdiv);
            document.querySelector("body").append(Div);
        });
        document.querySelector("#toTal").append("Total Price" + " :- " + totalPrice + " INR");
        document.querySelector("h2").append("Total Items" + " :- " + totalitem);
        function deletefun(elem, ind) {
            cartItem.splice(ind, 1);
            localStorage.setItem("cart", JSON.stringify(cartItem))
            window.location.reload();
        }
        let count = 1;
        function increment(id) {
            document.querySelector("#toTal").innerHTML = "";
            document.querySelector("h2").innerHTML = "";
            cartItem.forEach(function (el) {
                if (el.productId == id) {
                    let x = event.target.parentElement.children[5];
                    let Res = x.innerText;
                    let result = parseInt(Res) + 1;
                    x.innerText = result;
                    totalPrice += el.price;
                    totalitem++;
                    document.querySelector("h2").append("Total Items" + " :- " + totalitem);
                    document.querySelector("#toTal").append("Total Price" + " :- " + totalPrice + " INR");
                }
            })
        }
        function decrement(id) {
            document.querySelector("#toTal").innerHTML = "";
            document.querySelector("h2").innerHTML = "";
            cartItem.forEach(function (el) {
                if (el.productId == id) {
                    let x = event.target.parentElement.children[5];
                    let Res = x.innerText;
                    let result = parseInt(Res) - 1;
                    x.innerText = result;
                    if (x.innerText <= 0) {
                        x.innerText = 1;
                        document.querySelector("h2").append("Total Items" + " :- " + totalitem);
                        document.querySelector("#toTal").append("Total Price" + " :- " + totalPrice + " INR");
                    } else {
                        totalPrice -= el.price;
                        totalitem--;
                        document.querySelector("h2").append("Total Items" + " :- " + totalitem);
                        document.querySelector("#toTal").append("Total Price" + " :- " + totalPrice + " INR");
                    }
                }
            })
        }
        document.querySelector("#promo").addEventListener("click", myfunction);
        function myfunction() {
            document.querySelector("#toTal").innerHTML = "";
            let PromoCode = document.querySelector(".Promo").value;
            if (PromoCode === "masai30") {
                totalPrice -= (totalPrice / 100) * 30;
                alert("promocode applied")
                document.querySelector("#toTal").append("Total Price" + " :- " + totalPrice.toFixed(2) + " INR");
            } else {
                alert("wrong promocode")
                document.querySelector("#toTal").append("Total Price" + " :- " + totalPrice + " INR");
            }
        }
    };