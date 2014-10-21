[![Build Status](https://travis-ci.org/uh-joan/ellipticSignup.svg)](https://travis-ci.org/uh-joan/ellipticSignup)

ellipticSignup
==============

<div class="well well-lg">
Elliptic.co: a bunch of smartass bankers disguised in startup wannabes...
</div>

<div class="jumbotron text-center col-md-offset-2 col-md-8">
<div class="row">
<p class="lead">Full-Stack Solution For Elliptic SignUp From</p>
</div>
</div>

<div class="col-md-offset-2 col-md-8">
<p>This sample includes a three steps Sign Up <em>Application</em> Form following the information provided at elliptic/home/vault/<a href="https://www.elliptic.co/vault/application">signup</a></p>
<h4>Instructions</h4>
<ul>
<li>Click <em> Signup</em>to get started at the top bar right</li>
<li><em>Step 1</em> includes personal details.</li>
<li>In <em>step 2</em> information about the address is required.</li>
<li>And <em>step 3</em> is about the security questions.</li>
<li>Also available SignIn form, change password and edit profile.</li>
</ul>
</div>

<div class="col-md-offset-2 col-md-8">
<p>Features to highlight:</p>
<ul>
<li>The signup page is divided in three subpages using the <a href="http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.directive:ui-view">ui-view</a> directive.
</li>
<li>
Data Validation is run at different levels. From the web browser angularjs validation is used for required fields (e.g. username, passwords...). Password matching is done using angular directives. From the server side and using data validation in the model is done using mongoose.
</li>
<li>
Errors are provided when submitting forms.
</li>
</ul>
</div>

<div class="well col-md-offset-2 col-md-8">
<p>Technologies used:</p>
<ul>
<li>
<a href="http://www.mongodb.org/"><strong>M</strong>ongoDB</a>. Stored db at <a href="http://www.compose.io">compose.io</a> with <a href="http://mongoosejs.com/">Mongoose</a>, mongodb object modeling for node.js
</li>
<li>
<a href="http://expressjs.com/"><strong>E</strong>xpress</a> as the app server.
</li>
<li>
<a href="https://angularjs.org/"><strong>A</strong>ngularJS</a> as the web app framework.
</li>
<li>
<a href="http://nodejs.org/"><strong>N</strong>ode.js</a> as the web server.
</li>
</ul>
</div>
