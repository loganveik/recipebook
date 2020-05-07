// CREATES A RECIPE
// type in the fields and when you click create recipe this onclick event sends the data to the server in form of object
$(document).on("click", "#recipecreatebtn", function () {
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "/submit",
        data: {
            name: $("#recipename").val(),
            ingredients: $("#recipeingredient").val(),
            description: $("#recipedesc").val()
        }
    }).then(function (data) {
        $("#recipeview").prepend("<p class='data-entry' data-id=" + data._id + "><span class='dataTitle' data-id=" +
            data._id + ">" + data.name + "</span><span class='delete'>X</span></p>");
        $("#recipename").val("");
        $("#recipeingredient").val("");
        $("#recipedesc").val("");
    });
});

// GET FROM DB AND DISPLAY ON VIEW DIV
// this functions does a get from the server which is doing a get to the database in server.js...gets what user inputted and displays on recipeview id
function getResults() {
    $("#recipeview").empty();
    $.ajax({
        method: "GET",
        url: "/all"
    }).then(function (data) {
        for (var i = 0; i < data.length; i++) {
            $("#recipeview").prepend("<p class='data-entry' data-id=" + data[i]._id + "><span class='dataTitle' data-id=" +
                data[i]._id + ">" + data[i].name + "</span><span class='delete mx-1'>X</span></p>");
        }
    });
}

// this is calling back the function i just made, so that everytime the page loads and the script is ran, you can see a live up to date fetch all from the dB
getResults();

// DISPLAYS INFO ABOUT RECIPE BASED ON WHAT RECIPE YOU CLICKED
// THIS ONCLICK EVENT takes your results from db thats being displayed, and whatever you click on will take that id and perform a get request to the server/db and get the info and put it in the corresponding fields so that you can update what you just clicked on. update button is also created so that u can update any info
$(document).on("click", ".dataTitle", function () {
    const selected = $(this);
    $.ajax({
        method: "GET",
        url: "/find/" + selected.attr("data-id")
    }).then(function (data) {
        $("#recipename").val(data.name);
        $("#recipeingredient").val(data.ingredients);
        $("#recipedesc").val(data.description);
        $(".createNupdateBTN").html("<button type='submit' class='btn' id='recipeupdatebtn' data-id='" + data._id + "'>Update Recipe</button>");
    })
});

// THIS UPDATES ANY RECIPE
// this onclick function executes when u click update recipe after youve already clicked on a recipe thats being dispalyed in the div. you can update whatevrer you want, then click update and that will update the info with that _id. so its permanently changed forever.
$(document).on("click", "#recipeupdatebtn", function (event) {
    event.preventDefault();
    console.log($("#recipename").val())
    const selected = $(this);
    $.ajax({
        method: "POST",
        url: "/update/" + selected.attr("data-id"),
        dataType: "json",
        data: {
            name: $("#recipename").val(),
            ingredients: $("#recipeingredient").val(),
            description: $("#recipedesc").val()
        }
    }).then(function (data) {
        console.log("wqfwqf")
        $("#recipename").val("");
        $("#recipeingredient").val("");
        $("#recipedesc").val("");
        $(".createNupdateBTN").html("<button type='submit' class='btn' id='recipecreatebtn'>Create Recipe</button>");
        getResults();
    })
});

// THIS DELETES ONE ITEM/RECIPE FROM DB...  BASICALLY WHATEVER YOU CLICKED ON
// this onclick is for the "x" next to recipe names on the dispaly div. you click this and it deletes whatever recipe that "x" was attatched to
$(document).on("click", ".delete", function () {
    const selected = $(this).parent();
    $.ajax({
        method: "DELETE",
        url: "/delete/" + selected.attr("data-id")
    }).then(function () {
        selected.remove();
        $("#recipename").val("");
        $("#recipeingredient").val("");
        $("#recipedesc").val("");
        $(".createNupdateBTN").html("<button type='submit' class='btn' id='recipecreatebtn'>Create Recipe</button>");
    })
});

// THIS DELETES EVERYTHING IN THE DATABASE!!
// this onclick event happens when you click the clear all button. basically what happens is it wipes the entire database and all of your recipes are gone from the page, server, and database.. permanently!
$(document).on("click", "#recipeclearbtn", function () {
    $.ajax({
        method: "DELETE",
        dataType: "json",
        url: "/clearall"
    }).then(function () {
        $("#recipeview").empty();
    })
});


// this is the "+" button under ingredient. you click it and it adds more input fields if your recipe hads multiple ingredients
// $(document).on("click", "#ingredientaddbtn", function () {
//     const newIngredient = $("<input type='text' class='form-control my-1' id='recipeingredient'>");
//     const Ingredients = $("<label for='recipeingredient'>Ingredients</label>");
//     $(".ingredientORingredientsDIV").empty();
//     $(".ingredientORingredientsDIV").append(Ingredients);
//     $(".ingredientInput").append(newIngredient);
// });