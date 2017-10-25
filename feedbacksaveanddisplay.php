<html>

   <head>
      <title>Feedback History</title>

      <style type = "text/css">
         body {
            font-family: arial;
			background-color: white;
         }
     table, tr, td, th {
            text-align: center;
            font-size: 12pt;
            border: 3px groove;
            padding: 5px;
            color: blue;
         }
    </style>
    </head>

<body>
      <p style = "font-size: 2em;">Feedback History</p>

      <table>
         <thead>
            <tr>
               <th style = "width: 100px;">Name</th>
               <th style = "width: 200px;">Feedback</th>
               <th style = "width: 50px;">Score</th>
               <th style = "width: 100px;">Product</th>
            </tr>
         </thead>

         <tbody>


<?php

    $name = $_POST['name'];
    $feedback = $_POST['feedback'];
    $score = $_POST['score'];
    $product = $_POST['product'];
    $user = $_POST['user'];
    $pwd = $_POST['pwd'];

    //echo $name.":".$feedback.":".$score.":".$product.":".$user.":".$pwd;

    //connect to the database
    $connectionstring = odbc_connect("118w_lab", $user, $pwd);

    $Insert = "INSERT INTO t2_456 VALUES ('$name', '$product', '$feedback', '$score')";

    $results = odbc_do($connectionstring, $Insert);

    //SQL query
    $Query = "SELECT name, feedback, score, product FROM t2_456";

    //execute query
    $queryexe = odbc_do($connectionstring, $Query);

    //query database
    while(odbc_fetch_row($queryexe))
    {

    	//collect results
    	$name = odbc_result($queryexe, 1);
    	$feedback = odbc_result($queryexe, 2);
    	$score = odbc_result($queryexe, 3);
    	$product = odbc_result($queryexe, 4);

    	//format and display results
    	print ("<tr>");
    	print ("<td>$name</td>");
    	print ("<td>$feedback</td>");
    	print ("<td>$score</td>");
    	print ("<td>$product</td>");
    	print ("</tr>");
    }

    //disconnect from database
    odbc_close($connectionstring);

    ?>

     	</tbody>
      </table>
   </body>

</html>
