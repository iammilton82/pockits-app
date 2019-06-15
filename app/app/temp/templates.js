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
    "<div class=\"container\" ng-init=\"initForm()\">\n" +
    "	<div class=\"padded\">\n" +
    "		<header class=\"section-header\">\n" +
    "			<h1>Account Login</h1>\n" +
    "		</header>\n" +
    "		<section class=\"body-content\">\n" +
    "			<form name=\"accountLogin\" ng-show=\"state.status === 'not-submitted'\">\n" +
    "				\n" +
    "				<div class=\"row\">\n" +
    "					<p>Enter your email address and password to login</p>\n" +
    "					<div class=\"alerts row\">\n" +
    "						<p>{{state.message}}</p>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				\n" +
    "				<div class=\"row\">\n" +
    "					<input type=\"email\" ng-class=\"{ 'has-data' : data.email.length > 0 }\" name=\"email\" ng-model=\"data.email\" required=\"required\" />\n" +
    "					<label for=\"email\">Email Address</label>\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<input type=\"password\" ng-class=\"{ 'has-data' : data.password.length > 0 }\" name=\"password\" ng-model=\"data.password\" required=\"required\" />\n" +
    "					<label for=\"password\">Password</label>\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"actions row\">\n" +
    "						<button type=\"submit\" ng-disabled=\"accountLogin.$invalid\" ng-click=\"loginUser(data)\">Login</button>\n" +
    "					</div>\n" +
    "					<div class=\"centered\">\n" +
    "						<div class=\"row\"><a href=\"/#!/register\">Create new account &raquo;</a></div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</form>\n" +
    "			<section class=\"module form error\" ng-show=\"state.status === 'error'\">\n" +
    "				<header><h1>Try again later</h1></header>\n" +
    "				<section>\n" +
    "					<p>Looks like we had an error signing you into your account.  Try again later.</p>\n" +
    "					<p><a href=\"/#!/\">Return to the Homepage</a></p>\n" +
    "				</section>\n" +
    "			</section>\n" +
    "		</section>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"loading\" ng-class=\"{'active' : state.status === 'loading'}\"></div>\n" +
    "");
  $templateCache.put("users/register.tpl.html",
    "<div class=\"container\" ng-init=\"initForm()\">\n" +
    "	<div class=\"padded\">\n" +
    "		<header class=\"section-header\">\n" +
    "			<h1>Register New Account</h1>\n" +
    "		</header>\n" +
    "		<section class=\"body-content\">\n" +
    "			<form name=\"newUserRegistration\" ng-show=\"state.status === 'not-submitted'\">\n" +
    "				\n" +
    "				<div class=\"row\">\n" +
    "					<p>Use the form below to register and create your new account.</p>\n" +
    "					<div class=\"alerts row\">\n" +
    "						<p>{{state.message}}</p>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				\n" +
    "				<div class=\"row\">\n" +
    "					<input type=\"text\" ng-class=\"{ 'has-data' : data.firstName.length > 0 }\" name=\"firstName\" ng-model=\"data.firstName\" required=\"required\" />\n" +
    "					<label for=\"firstName\">First Name</label>\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<input type=\"text\" ng-class=\"{ 'has-data' : data.lastName.length > 0 }\" name=\"lastName\" ng-model=\"data.lastName\" required=\"required\" />\n" +
    "					<label for=\"lastName\">Last Name</label>\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<input type=\"email\" ng-class=\"{ 'has-data' : data.email.length > 0 }\" name=\"email\" ng-model=\"data.email\" required=\"required\" />\n" +
    "					<label for=\"email\">Email Address</label>\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<input type=\"password\" ng-class=\"{ 'has-data' : data.password.length > 0 }\" name=\"password\" ng-model=\"data.password\" required=\"required\" />\n" +
    "					<label for=\"password\">Password</label>\n" +
    "				</div>\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"actions row\">\n" +
    "						<button type=\"submit\" ng-disabled=\"newUserRegistration.$invalid\" ng-click=\"registerUser(data)\">Register</button>\n" +
    "					</div>\n" +
    "					<div class=\"centered\">\n" +
    "						<div class=\"row\"><a href=\"/#!/login\">Login to your account &raquo;</a></div>\n" +
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
    "</div>\n" +
    "\n" +
    "<div class=\"loading\" ng-class=\"{'active' : state.status === 'loading'}\"></div>\n" +
    "");
}]);
