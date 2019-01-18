var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

var loggedIn = require('../middleware/loggedin');
var isAdmin = require('../middleware/isAdmin');

<div class="row">
<div class='col s6'>
        <form action="/main/result" method='POST'>   
        <select name='selectionbox' class="browser-default selectionbox black-text z-depth-3">
            <option value="null" selected>Ticker/Coin Name</option>
            <% for(i = 0; i < coin.length; i++ ) {%>
            <option value="<%= coin[i].code %>"><%= coin[i].name %>/<%= coin[i].code %></option>
                <% } %>
        </select>
</div>

<div class='col s6'>
    <button class="btn waves-effect waves-light z-depth-3" type="submit" name="action">Submit</button>
</div>
        </form>
</div>


<h1>Track Your Investments</h1>
<div class='row'>
        <div class='col s12 m6 l5'>
            <p><span>Name: </span> <%= coinDetail.ticker.base %></p>
            <p><span>Price: </span> <%= coinDetail.ticker.price %></p>
            <p><span>Volume: </span> <%= coinDetail.ticker.volume %></p>
            <p><span>24 hour Change: </span> <%= coinDetail.ticker.change %></p>
            </div>

</div>

router.get('/admins', function(req, res){
    res.render('admin');
});




<div class='row'>
        <div class='col s12 m12 l12 form-background z-depth-5'>
          <h4 class='center'><%= display[2].IMAGEURL %></h4>
          <img class='responsive-img' src="/img/stock/1.jpg"></a>
          <div class='col s12 m3 l3 center'>
            <img class='responsive-img activator' src='<%= recipe[0].image %>' alt='<%= recipe[0].label %>'>
            <br>
            <a href='<%= recipe[0].url %>'>Link to Source</a>
          </div>
          <div class='col s12 m3 l3'>
            <h5>Ingredients: </h5>
            <div class='ingredients detail'>
              <ul class='browser-default'>
                <% for(i = 0; i < recipe[0].ingredientLines.length; i++ ) {%>
                  <li> <%= recipe[0].ingredientLines[i] %> </li>
                <% } %>
              </ul>
            </div>
          </div>
      
          <div class='col s12 m3 l3'>
            <h5>Additional Info:</h5>
            <div class='ingredients detail'>
              <ul>
                <li><span class='label'>Calories Per Serving:</span> <script> document.write(calPerServ) </script></li>
                <li><span class='label'>Servings:</span> <%= recipe[0].yield %> </li>
                <h5  class='health'> Health Labels: </h5>
                <% for(i = 0; i < recipe[0].healthLabels.length; i++ ) {%>
                  <li><%= recipe[0].healthLabels[i] %></li>
                <% } %>
                <h5 class='caution'> Cautions: </h5>
                <% for(i = 0; i < recipe[0].cautions.length; i++ ) {%>
                  <li> <%= recipe[0].cautions[i] %> </li>
                <% } %>
              </ul>
            </div>
          </div>
      
          <div class='col s12 m3 l3'>
            <h5>Nutrients:</h5>
            <div class='ingredients detail'>
              <ul>
                <% var nutrients = recipe[0].totalNutrients; %>
                <% var totalDaily = recipe[0].totalDaily; %>
                <% for (var item in nutrients) { %>
                  <li> <span class='label'><%= nutrients[item].label %>:</span> <%= Math.floor(nutrients[item].quantity) %> <%= nutrients[item].unit %>   </li>
                <% } %>
              </ul>
              <h5  class='health'> Total Daily: </h5>
              <ul>
                <% for (var item in totalDaily) { %>
                  <li> <span class='label'><%= totalDaily[item].label %>:</span> <%= Math.floor(totalDaily[item].quantity) %><%= totalDaily[item].unit %>   </li>
                <% } %>
              </ul>
            </div>
          </div>


          module.exports = router;