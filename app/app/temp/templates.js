angular.module('templates', []).run(['$templateCache', function ($templateCache) {
  "use strict";
  $templateCache.put("dashboard/index.tpl.html",
    "<div class=\"container\">\n" +
    "	<div class=\"padded\">\n" +
    "		<header class=\"section-header\">\n" +
    "			<h1>Dashboard</h1>\n" +
    "		</header>\n" +
    "		<section class=\"body-content\">\n" +
    "\n" +
    "			<p>Hi {{me.firstName}}, Welcome to your {{me.display}} dashboard!</p>\n" +
    "			\n" +
    "			<p><a href=\"/#!/payments/charge\">Single Charge &raquo;</a></p>\n" +
    "			<p><a href=\"/#!/payments/subscription\">Subscribe to a Plan &raquo;</a></p>\n" +
    "			<p><a href=\"/#!/payments/history\">Payment History &raquo;</a></p>\n" +
    "			\n" +
    "			<p ng-controller=\"authenticate\"><a href ng-click=\"initLogout(true)\">Logout &raquo;</a></p>\n" +
    "			\n" +
    "		</section>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"loading\" ng-class=\"{'active' : state.status === 'loading'}\"></div>\n" +
    "");
  $templateCache.put("home/index.tpl.html",
    "<div class=\"container\">\n" +
    "	<div class=\"padded\">\n" +
    "		<header class=\"section-header\">\n" +
    "			<h1>This is the homepage</h1>\n" +
    "		</header>\n" +
    "		<section class=\"body-content\">\n" +
    "			<ul>\n" +
    "				<li><a href=\"#!/login\">Login</a> &mdash; Login into your account </li>\n" +
    "				<li><a href=\"#!/register\">Register</a> &mdash; Create a new user account</li>\n" +
    "			</ul>\n" +
    "		</section>\n" +
    "	</div>\n" +
    "</div>");
  $templateCache.put("payments/charge.tpl.html",
    "<div ng-include src=\"'site/header.tpl.html'\"></div>\n" +
    "\n" +
    "<div class=\"container\" ng-init=\"initTransaction()\">\n" +
    "	<div class=\"padded\">\n" +
    "		<header class=\"section-header\">\n" +
    "			<h1>Single Charge</h1>\n" +
    "		</header>\n" +
    "		<section class=\"body-content\" ng-switch=\"state.status\">\n" +
    "			<section id=\"charge-form\" ng-switch-default>\n" +
    "				\n" +
    "				<form name=\"oneTimeCharge\">\n" +
    "					<p>This charge is processed by {{ payments.provider }}.</p>\n" +
    "					\n" +
    "					<div class=\"row\">\n" +
    "						<input type=\"text\" ng-class=\"{ 'has-data' : data.amount.length > 0 }\" name=\"amount\" ng-model=\"data.amount\" required=\"required\" />\n" +
    "						<label for=\"amount\">Transaction Amount</label>\n" +
    "					</div>\n" +
    "					<div class=\"row\">\n" +
    "						<input type=\"text\" ng-class=\"{ 'has-data' : data.number.length > 0 }\" name=\"number\" ng-model=\"data.number\" required=\"required\" />\n" +
    "						<label for=\"number\">Card Number</label>\n" +
    "					</div>\n" +
    "					<div class=\"row\">\n" +
    "						<div class=\"split\">\n" +
    "							<input type=\"text\" ng-class=\"{ 'has-data' : data.expYear.length > 0 }\" name=\"expMonth\" ng-model=\"data.expMonth\" required=\"required\" />\n" +
    "							<label for=\"expMonth\">Expiration Month</label>\n" +
    "						</div>\n" +
    "						<div class=\"split\">\n" +
    "							<input type=\"text\" ng-class=\"{ 'has-data' : data.expYear.length > 0 }\" name=\"expYear\" ng-model=\"data.expYear\" required=\"required\" />\n" +
    "							<label for=\"expYear\">Expiration Year</label>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					<div class=\"row\">\n" +
    "						<div class=\"split\">\n" +
    "							<input type=\"text\" ng-class=\"{ 'has-data' : data.cvv.length > 0 }\" name=\"cvv\" ng-model=\"data.cvv\" required=\"required\" />\n" +
    "							<label for=\"cvv\">Card CVV</label>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					<div class=\"row\">\n" +
    "						<div class=\"actions row\">\n" +
    "							<button type=\"button\" ng-disabled=\"oneTimeCharge.$invalid\" ng-click=\"makeOneTimeCharge(oneTimeCharge, data)\">Process Payment</button>\n" +
    "						</div>\n" +
    "						<div class=\"centered\">\n" +
    "							<div class=\"row\"><a href=\"/#!/payments/subscription\">Try a subscription &raquo;</a></div>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					\n" +
    "				</form>\n" +
    "				\n" +
    "			</section>\n" +
    "			\n" +
    "			<section class=\"notice\" ng-switch-when=\"charge-success\">\n" +
    "				<div class=\"success\">\n" +
    "					<p>Success! Your transaction has been processed successfully.</p>\n" +
    "				</div>\n" +
    "			</section>\n" +
    "\n" +
    "			<section class=\"notice\" ng-switch-when=\"error\">\n" +
    "				<div class=\"error\">\n" +
    "					<p>Unfortunately, we are unable to process transactions at this time. Try again later.</p>\n" +
    "				</div>\n" +
    "			</section>\n" +
    "\n" +
    "			<section class=\"notice\" ng-switch-when=\"charge-error\">\n" +
    "				<div class=\"error\">\n" +
    "					<p>Unfortunately, we are unable to process transactions at this time. Try again later.</p>\n" +
    "				</div>\n" +
    "			</section>\n" +
    "\n" +
    "			<section class=\"notice\" ng-switch-when=\"no-connection\">\n" +
    "				<div class=\"error\">\n" +
    "					<p>We are having trouble connecting to the internet.  Try again later.</p>\n" +
    "				</div>\n" +
    "			</section>\n" +
    "\n" +
    "			\n" +
    "			<p><a href=\"/#!/dashboard\">Back to dashboard &raquo;</a></p>\n" +
    "			<p ng-controller=\"authenticate\"><a href ng-click=\"initLogout(true)\">Logout &raquo;</a></p>\n" +
    "			\n" +
    "		</section>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"loading\" ng-class=\"{'active' : state.status === 'loading'}\"></div>\n" +
    "\n" +
    "<div ng-include src=\"'site/alerts.tpl.html'\"></div>\n" +
    "");
  $templateCache.put("payments/index.tpl.html",
    "<div ng-include src=\"'site/header.tpl.html'\"></div>\n" +
    "\n" +
    "<div class=\"container\" ng-init=\"initPaymentHistory()\">\n" +
    "	<div class=\"padded\">\n" +
    "		<header class=\"section-header\">\n" +
    "			<h1>My Payments</h1>\n" +
    "		</header>\n" +
    "		<section class=\"body-content\" ng-switch=\"state.status\">\n" +
    "			\n" +
    "			<section id=\"charge-form\" ng-switch-when=\"success\">\n" +
    "				<div class=\"padded\">\n" +
    "					<table width=\"100%\" class=\"table\">\n" +
    "						<tr>\n" +
    "							<th>Transaction ID</th>\n" +
    "							<th>Amount</th>\n" +
    "							<th>Date</th>\n" +
    "							<th>Status</th>\n" +
    "							<td>#</td>\n" +
    "						</tr>\n" +
    "						<tr ng-repeat=\"payment in payments\">\n" +
    "							<td>{{ payment.transactionId }}</td>\n" +
    "							<td>{{ payment.amount | currency: payment.symbol }}</td>\n" +
    "							<td>{{ payment.dateCreated }}</td>\n" +
    "							<td>{{ returnStatus(payment.status) }}</td>\n" +
    "							<td><a href ng-click=\"refundTransaction(payment)\">Issue Refund</a></td>\n" +
    "						</tr>\n" +
    "					</table>\n" +
    "				</div>\n" +
    "			</section>\n" +
    "\n" +
    "			<section class=\"notice\" ng-switch-when=\"no-results\">\n" +
    "				<div class=\"warning\">\n" +
    "					<p>You have not made any purchases yet.</p>\n" +
    "				</div>\n" +
    "			</section>\n" +
    "			\n" +
    "			<section class=\"notice\" ng-switch-when=\"error\">\n" +
    "				<div class=\"error\">\n" +
    "					<p>We are having trouble retrieving your payment history. Please try again later.</p>\n" +
    "				</div>\n" +
    "			</section>\n" +
    "\n" +
    "\n" +
    "			<p><a href=\"/#!/dashboard\">Back to dashboard &raquo;</a></p>\n" +
    "			<p ng-controller=\"authenticate\"><a href ng-click=\"initLogout(true)\">Logout &raquo;</a></p>\n" +
    "			\n" +
    "			\n" +
    "		</section>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"loading\" ng-class=\"{'active' : state.status === 'loading'}\"></div>\n" +
    "\n" +
    "<div ng-include src=\"'site/alerts.tpl.html'\"></div>\n" +
    "");
  $templateCache.put("payments/subscription.tpl.html",
    "<div ng-include src=\"'site/header.tpl.html'\"></div>\n" +
    "\n" +
    "<div class=\"container\">\n" +
    "	<div class=\"padded\" ng-init=\"initSubscriptionPlans()\">\n" +
    "		<header class=\"section-header\">\n" +
    "			<h1>Subscribe to a Plan</h1>\n" +
    "		</header>\n" +
    "		<section class=\"body-content\" ng-switch=\"state.status\">\n" +
    "			<section id=\"charge-form\" ng-switch-default>\n" +
    "				\n" +
    "				<form name=\"subscribeToPlan\">\n" +
    "					<p>This charge is processed by {{ payments.provider }}.</p>\n" +
    "					\n" +
    "					<div class=\"row\">\n" +
    "						<label for=\"amount\">Select a Plan</label>\n" +
    "						<div>\n" +
    "							<select name=\"plan\" id=\"plan\" ng-model=\"data.plan\" ng-options=\"option.name for option in plans track by option.id\">\n" +
    "							</select>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					<div class=\"row\">\n" +
    "						<input type=\"text\" ng-class=\"{ 'has-data' : data.number.length > 0 }\" name=\"number\" ng-model=\"data.number\" required=\"required\" />\n" +
    "						<label for=\"number\">Card Number</label>\n" +
    "					</div>\n" +
    "					<div class=\"row\">\n" +
    "						<div class=\"split\">\n" +
    "							<input type=\"text\" ng-class=\"{ 'has-data' : data.expYear.length > 0 }\" name=\"expMonth\" ng-model=\"data.expMonth\" required=\"required\" />\n" +
    "							<label for=\"expMonth\">Expiration Month</label>\n" +
    "						</div>\n" +
    "						<div class=\"split\">\n" +
    "							<input type=\"text\" ng-class=\"{ 'has-data' : data.expYear.length > 0 }\" name=\"expYear\" ng-model=\"data.expYear\" required=\"required\" />\n" +
    "							<label for=\"expYear\">Expiration Year</label>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					<div class=\"row\">\n" +
    "						<div class=\"split\">\n" +
    "							<input type=\"text\" ng-class=\"{ 'has-data' : data.cvv.length > 0 }\" name=\"cvv\" ng-model=\"data.cvv\" required=\"required\" />\n" +
    "							<label for=\"cvv\">Card CVV</label>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					\n" +
    "					<!--\n" +
    "					<div class=\"row\">\n" +
    "						<input type=\"text\" ng-class=\"{ 'has-data' : data.coupon.length > 0 }\" name=\"coupon\" ng-model=\"data.coupon\" required=\"required\" />\n" +
    "						<label for=\"coupon\">Coupon Code</label>\n" +
    "					</div>\n" +
    "					-->\n" +
    "					\n" +
    "					<div class=\"row\">\n" +
    "						<div class=\"actions row\">\n" +
    "							<button type=\"button\" ng-disabled=\"subscribeToPlan.$invalid\" ng-click=\"subscribeToPaymentPlan(subscribeToPlan, data)\">Process Payment</button>\n" +
    "						</div>\n" +
    "						<div class=\"centered\">\n" +
    "							<div class=\"row\"><a href=\"/#!/payments/charge\">Make a one time payment &raquo;</a></div>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "					\n" +
    "				</form>\n" +
    "				\n" +
    "			</section>\n" +
    "			\n" +
    "			<section class=\"notice\" ng-switch-when=\"charge-success\">\n" +
    "				<div class=\"success\">\n" +
    "					<p>Success! Your subscription has been processed successfully.</p>\n" +
    "				</div>\n" +
    "			</section>\n" +
    "\n" +
    "			<section class=\"notice\" ng-switch-when=\"error\">\n" +
    "				<div class=\"error\">\n" +
    "					<p>Unfortunately, we are unable to process subscriptions at this time. Try again later.</p>\n" +
    "				</div>\n" +
    "			</section>\n" +
    "\n" +
    "			<section class=\"notice\" ng-switch-when=\"charge-error\">\n" +
    "				<div class=\"error\">\n" +
    "					<p>Unfortunately, we are unable to process subscriptions at this time. Try again later.</p>\n" +
    "				</div>\n" +
    "			</section>\n" +
    "\n" +
    "			<section class=\"notice\" ng-switch-when=\"no-connection\">\n" +
    "				<div class=\"error\">\n" +
    "					<p>We are having trouble connecting to the internet.  Try again later.</p>\n" +
    "				</div>\n" +
    "			</section>\n" +
    "\n" +
    "			\n" +
    "			<p><a href=\"/#!/dashboard\">Back to dashboard &raquo;</a></p>\n" +
    "			<p ng-controller=\"authenticate\"><a href ng-click=\"initLogout(true)\">Logout &raquo;</a></p>\n" +
    "			\n" +
    "		</section>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"loading\" ng-class=\"{'active' : state.status === 'loading'}\"></div>\n" +
    "\n" +
    "<div ng-include src=\"'site/alerts.tpl.html'\"></div>\n" +
    "");
  $templateCache.put("site/alerts.tpl.html",
    "<div id=\"alerts\" ng-class=\"{ 'show' : happening.status !== 'not-submitted' }\">\n" +
    "	<div class=\"alert-container\">\n" +
    "		<div class=\"alert {{happening.status}}\">\n" +
    "			{{ happening.message }}\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
  $templateCache.put("site/header.tpl.html",
    "<header id=\"header\">\n" +
    "\n" +
    "\n" +
    "</header>");
  $templateCache.put("site/page-not-found.tpl.html",
    "<h1>Page not found!</h1>");
  $templateCache.put("users/expired.tpl.html",
    "<div class=\"container\" ng-init=\"initLogout(false)\">\n" +
    "	<div class=\"padded\">\n" +
    "		<header class=\"section-header\">\n" +
    "			<h1>Session Expired</h1>\n" +
    "		</header>\n" +
    "		<section class=\"body-content\">\n" +
    "			<p>Looks like your session expired.</p>\n" +
    "			<p><a href=\"/#!/login\">Click to login again &raquo;</a></p>\n" +
    "		</section>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"loading\" ng-class=\"{'active' : state.status === 'loading'}\"></div>\n" +
    "");
  $templateCache.put("users/login.tpl.html",
    "<section id=\"authentication\">\n" +
    "	<div id=\"credentials\" class=\"container\" ng-init=\"initForm()\">\n" +
    "		<header class=\"section-header\">\n" +
    "			<h1>Sign In</h1>\n" +
    "		</header>\n" +
    "		<section class=\"body-content\">\n" +
    "			<form name=\"accountLogin\" ng-show=\"state.status === 'not-submitted'\">\n" +
    "\n" +
    "				<div class=\"row\">\n" +
    "					<input type=\"email\" ng-class=\"{ 'has-data' : data.email.length > 0 }\" name=\"email\" ng-model=\"data.email\" required=\"required\" placeholder=\"Email Address\" />\n" +
    "					<div ng-messages=\"accountLogin.email.$error\" ng-show=\"accountLogin.email.$touched\" role=\"alert\">\n" +
    "						<div ng-message=\"required\">Your email address is required</div>\n" +
    "						<div ng-message=\"email\">Must be a valid email address</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<input type=\"password\" ng-class=\"{ 'has-data' : data.password.length > 0 }\" name=\"password\" ng-model=\"data.password\" ng-minlength=\"8\" required=\"required\" placeholder=\"Password\" />\n" +
    "					<div ng-messages=\"accountLogin.password.$error\" ng-show=\"accountLogin.password.$touched\" role=\"alert\">\n" +
    "						<div ng-message=\"required\">A password is required</div>\n" +
    "						<div ng-message=\"minlength\">Your password must be at least 8 characteres</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"actions row\">\n" +
    "						<button type=\"submit\" ng-disabled=\"accountLogin.$invalid\" ng-click=\"loginUser(data)\">Login</button>\n" +
    "					</div>\n" +
    "					<div class=\"centered\">\n" +
    "						<div class=\"row\"><a href=\"/app/#!/register\">Sign In &rsaquo;</a></div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</form>\n" +
    "\n" +
    "			<section class=\"module form error\" ng-show=\"state.status === 'error'\">\n" +
    "				<header><h1>Try again later</h1></header>\n" +
    "				<section>\n" +
    "					<p>Looks like we had an error signing you into your account.  Try again later.</p>\n" +
    "					<p><a href=\"/app/#!/\">Return to the Homepage</a></p>\n" +
    "				</section>\n" +
    "			</section>\n" +
    "\n" +
    "		</section>\n" +
    "	</div>\n" +
    "</section>\n" +
    "<div class=\"loading\" ng-class=\"{'active' : state.status === 'loading'}\"></div>\n" +
    "");
  $templateCache.put("users/register-account.tpl.html",
    "<section id=\"authentication\">\n" +
    "	<div id=\"credentials\" class=\"container\" ng-init=\"initForm()\">\n" +
    "		<header class=\"section-header\">\n" +
    "			<h1>Create your account</h1>\n" +
    "			<p>(It's super quick)</p>\n" +
    "		</header>\n" +
    "		<section class=\"body-content\">\n" +
    "			<form name=\"newUserRegistration\" ng-show=\"state.status === 'not-submitted'\">\n" +
    "\n" +
    "				<div class=\"row\">\n" +
    "					<input type=\"text\" ng-class=\"{ 'has-data' : data.firstName.length > 0 }\" ng-minlength=\"2\" name=\"firstName\" ng-model=\"data.firstName\" required=\"required\" placeholder=\"First Name\" />\n" +
    "					<div ng-messages=\"newUserRegistration.firstName.$error\" ng-show=\"newUserRegistration.firstName.$touched\" role=\"alert\">\n" +
    "						<div ng-message=\"required\">Your first name is required</div>\n" +
    "						<div ng-message=\"minlength\">You must enter at least 2 characters</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<input type=\"text\" ng-class=\"{ 'has-data' : data.lastName.length > 0 }\" name=\"lastName\" ng-model=\"data.lastName\" ng-minlength=\"2\" required=\"required\" placeholder=\"Last Name\" />\n" +
    "					<div ng-messages=\"newUserRegistration.lastName.$error\" ng-show=\"newUserRegistration.lastName.$touched\" role=\"alert\">\n" +
    "						<div ng-message=\"required\">Your last name is required</div>\n" +
    "						<div ng-message=\"minlength\">You must enter at least 2 characters</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<input type=\"email\" ng-class=\"{ 'has-data' : data.email.length > 0 }\" name=\"email\" ng-model=\"data.email\" required=\"required\" placeholder=\"Email Address\" />\n" +
    "					<div ng-messages=\"newUserRegistration.email.$error\" ng-show=\"newUserRegistration.email.$touched\" role=\"alert\">\n" +
    "						<div ng-message=\"required\">Your email address is required</div>\n" +
    "						<div ng-message=\"email\">Must be a valid email address</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<input type=\"password\" ng-class=\"{ 'has-data' : data.password.length > 0 }\" name=\"password\" ng-model=\"data.password\" ng-minlength=\"8\" required=\"required\" placeholder=\"Password\" />\n" +
    "					<div ng-messages=\"newUserRegistration.password.$error\" ng-show=\"newUserRegistration.password.$touched\" role=\"alert\">\n" +
    "						<div ng-message=\"required\">A password is required</div>\n" +
    "						<div ng-message=\"minlength\">Your password must be at least 8 characteres</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"actions row\">\n" +
    "						<button type=\"submit\" ng-disabled=\"newUserRegistration.$invalid\" ng-click=\"registerUser(data)\">Register</button>\n" +
    "					</div>\n" +
    "					<div class=\"centered\">\n" +
    "						<div class=\"row\"><a href=\"/app/#!/login\">Sign Up &rsaquo;</a></div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</form>\n" +
    "			<section class=\"module form success\" ng-show=\"state.status === 'success'\">\n" +
    "				<header><h1>Registration Success</h1></header>\n" +
    "				<section>\n" +
    "					<p>Your account has been created successfully.</p>\n" +
    "					<p><a href=\"/#!/login\">Click here to login to your account &raquo;</a></p>\n" +
    "				</section>\n" +
    "			</section>\n" +
    "			<section class=\"module form error\" ng-show=\"state.status === 'error'\">\n" +
    "				<header><h1>Try again later</h1></header>\n" +
    "				<section>\n" +
    "					<p>Looks like we had an error registering your account.  Try again later.</p>\n" +
    "					<p><a href=\"/#!/\">Return to the Homepage</a></p>\n" +
    "				</section>\n" +
    "			</section>\n" +
    "		</section>\n" +
    "	</div>\n" +
    "</section>\n" +
    "\n" +
    "<div class=\"loading\" ng-class=\"{'active' : state.status === 'loading'}\"></div>\n" +
    "");
  $templateCache.put("users/register-brand.tpl.html",
    "<section id=\"authentication\">\n" +
    "	<div id=\"credentials\" class=\"container\" ng-init=\"initForm()\">\n" +
    "		<header class=\"section-header\">\n" +
    "			<h1>Create your brand</h1>\n" +
    "			<p>Add your company name, logo and details</p>\n" +
    "		</header>\n" +
    "		<section class=\"body-content\">\n" +
    "			<form name=\"newUserRegistration\" ng-show=\"state.status === 'not-submitted'\">\n" +
    "				<input type=\"hidden\" name=\"accountId\" ng-model=\"data.accountId\" />\n" +
    "				<div class=\"row\">\n" +
    "					<input type=\"text\" ng-class=\"{ 'has-data' : data.company.length > 0 }\" name=\"company\" ng-model=\"data.company\" placeholder=\"Company Name\" />\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<input type=\"text\" ng-class=\"{ 'has-data' : data.address1.length > 0 }\" name=\"address1\" ng-model=\"data.address1\" placeholder=\"Street Address\" />\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<input type=\"text\" ng-class=\"{ 'has-data' : data.city.length > 0 }\" name=\"city\" ng-model=\"data.city\" placeholder=\"City\" />\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"split\">\n" +
    "						<input type=\"text\" ng-class=\"{ 'has-data' : data.state.length > 0 }\" name=\"state\" ng-model=\"data.state\" placeholder=\"State\" />\n" +
    "					</div>\n" +
    "					<div class=\"split\">\n" +
    "						<input type=\"text\" ng-class=\"{ 'has-data' : data.zip.length > 0 }\" name=\"zip\" ng-model=\"data.zip\" ng-minlength=\"2\" placeholder=\"Zip Code\" />\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"actions row\">\n" +
    "						<button type=\"submit\" ng-disabled=\"newUserRegistration.$invalid\" ng-click=\"createBrand(data)\">Submit</button>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</form>\n" +
    "			<section class=\"module form success\" ng-show=\"state.status === 'success'\">\n" +
    "				<header><h1>Registration Success</h1></header>\n" +
    "				<section>\n" +
    "					<p>Your account has been created successfully.</p>\n" +
    "					<p><a href=\"/#!/login\">Click here to login to your account &raquo;</a></p>\n" +
    "				</section>\n" +
    "			</section>\n" +
    "			<section class=\"module form error\" ng-show=\"state.status === 'error'\">\n" +
    "				<header><h1>Try again later</h1></header>\n" +
    "				<section>\n" +
    "					<p>Looks like we had an error registering your account.  Try again later.</p>\n" +
    "					<p><a href=\"/#!/\">Return to the Homepage</a></p>\n" +
    "				</section>\n" +
    "			</section>\n" +
    "		</section>\n" +
    "	</div>\n" +
    "</section>\n" +
    "\n" +
    "<div class=\"loading\" ng-class=\"{'active' : state.status === 'loading'}\"></div>\n" +
    "");
}]);
