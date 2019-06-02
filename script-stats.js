var VIEW_ID = '196045393';

function queryAll() {
  queryReports();
  queryReports2();
  queryReports3();
}

// Query the API for page views.
function queryReports() {
  gapi.client.request({
    path: '/v4/reports:batchGet',
    root: 'https://analyticsreporting.googleapis.com/',
    method: 'POST',
    body: {
      reportRequests: [{
        viewId: VIEW_ID,
        dateRanges: [{
          startDate: '7daysAgo',
          endDate: 'today'
        }],
        dimensions: [{
          name: 'ga:pagePath'
        }],
        metrics: [{
          expression: 'ga:pageviews'
        }, {
          expression: 'ga:avgTimeOnPage'
        }],
        orderBys: [{
          fieldName: 'ga:pageviews',
          sortOrder: 'DESCENDING'
        }]
      }]
    }
  }).then(displayResults, console.error.bind(console));
}

// query the api for achieved goals
function queryReports2() {
  gapi.client.request({
    path: '/v4/reports:batchGet',
    root: 'https://analyticsreporting.googleapis.com/',
    method: 'POST',
    body: {
      reportRequests: [{
        viewId: VIEW_ID,
        dateRanges: [{
          startDate: '7daysAgo',
          endDate: 'today'
        }],
        dimensions: [{
          name: 'ga:goalCompletionLocation'
        }],
        metrics: [{
          expression: 'ga:goalCompletionsAll'
        }]
      }]
    }
  }).then(displayResults2, console.error.bind(console));
}

// Query the API for events.
function queryReports3() {
  gapi.client.request({
    path: '/v4/reports:batchGet',
    root: 'https://analyticsreporting.googleapis.com/',
    method: 'POST',
    body: {
      reportRequests: [{
        viewId: VIEW_ID,
        dateRanges: [{
          startDate: '7daysAgo',
          endDate: 'today'
        }],
        dimensions: [{
          name: 'ga:eventCategory'
        }, {
          name: 'ga:eventAction'
        }, {
          name: 'ga:eventLabel'
        }],
        metrics: [{
          expression: 'ga:totalEvents'
        }],
        orderBys: [{
          fieldName: 'ga:totalEvents',
          sortOrder: 'DESCENDING'
        }]
      }]
    }
  }).then(displayResults3, console.error.bind(console));
}

// function to display URL of visited pages, frequency and average time of visit
function displayResults(response) {
  // get results
  var arrayResult = response.result.reports[0].data.rows;
  
  // create a table
  var body = document.getElementById('table1');
  var tbl = document.createElement('table');
  tbl.classList.add('table'); 

  // create header row
  var th = document.createElement('thead');
  var thr = document.createElement('tr');
  var thd1 = document.createElement('td');
  thd1.appendChild(document.createTextNode('Page path'));
  thr.appendChild(thd1);
  var thd2 = document.createElement('td');
  thd2.appendChild(document.createTextNode('Page views'));
  thr.appendChild(thd2);
  var thd3 = document.createElement('td');
  thd3.appendChild(document.createTextNode('Avg. time on page'));
  thr.appendChild(thd3);
  th.appendChild(thr);
  tbl.appendChild(th);

  // create table body and add data to it
  var tbdy = document.createElement('tbody');

  for (var i = 0; i < arrayResult.length; i++) {
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.appendChild(document.createTextNode(arrayResult[i].dimensions[0]));
    tr.appendChild(td1);
    var td2 = document.createElement('td');
    td2.appendChild(document.createTextNode(arrayResult[i].metrics[0].values[0]));
    tr.appendChild(td2);
    var td3 = document.createElement('td');
    td3.appendChild(document.createTextNode(arrayResult[i].metrics[0].values[1]));
    tr.appendChild(td3);
    tbdy.appendChild(tr);
  }

  tbl.appendChild(tbdy);
  body.appendChild(tbl);
}

// function to display URL of visited pages, frequency and average time of visit
function displayResults2(response) {
  // get results
  var arrayResult = response.result.reports[0].data.rows;

  // create a table
  var body = document.getElementById('table2');
  var tbl = document.createElement('table');
  tbl.classList.add('table');

  // create header row
  var th = document.createElement('thead');
  var thr = document.createElement('tr');
  var thd1 = document.createElement('td');
  thd1.appendChild(document.createTextNode('Goal name'));
  thr.appendChild(thd1);
  var thd2 = document.createElement('td');
  thd2.appendChild(document.createTextNode('Goal reached successfully'));
  thr.appendChild(thd2);
  th.appendChild(thr);
  tbl.appendChild(th);

  // create table body and add data to it
  var tbdy = document.createElement('tbody');

  for (var i = 0; i < arrayResult.length; i++) {
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var goalName = '';

    if (arrayResult[i].dimensions[0] === '/GAtest/hvala.html') {
      goalName = 'Oddan obrazec';
    } else if (arrayResult[i].dimensions[0] === '/GAtest/index.html') {
      goalName = 'Klik na homepage gumb';
    } else if (arrayResult[i].dimensions[0] === '/GAtest/igraj-se.html') {
      goalName = 'Izvedeno sortiranje';
    }

    td1.appendChild(document.createTextNode(goalName));
    tr.appendChild(td1);
    var td2 = document.createElement('td');
    td2.appendChild(document.createTextNode(arrayResult[i].metrics[0].values[0]));
    tr.appendChild(td2);
    tbdy.appendChild(tr);
  }

  tbl.appendChild(tbdy);
  body.appendChild(tbl);
}

// function to display events
function displayResults3(response) {
  // get results
  var arrayResult = response.result.reports[0].data.rows;

  // create a table
  var body = document.getElementById('table3');
  var tbl = document.createElement('table');
  tbl.classList.add('table'); 
  
  // create header row
  var th = document.createElement('thead');
  var thr = document.createElement('tr');
  var thd1 = document.createElement('td');
  thd1.appendChild(document.createTextNode('Event category'));
  thr.appendChild(thd1);
  var thd2 = document.createElement('td');
  thd2.appendChild(document.createTextNode('Event action'));
  thr.appendChild(thd2);
  var thd3 = document.createElement('td');
  thd3.appendChild(document.createTextNode('Event label'));
  thr.appendChild(thd3);
  var thd4 = document.createElement('td');
  thd4.appendChild(document.createTextNode('Number of events'));
  thr.appendChild(thd4);
  th.appendChild(thr);
  tbl.appendChild(th); 
  
  // create table body and add data to it
  var tbdy = document.createElement('tbody');

  for (var i = 0; i < arrayResult.length; i++) {
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.appendChild(document.createTextNode(arrayResult[i].dimensions[0]));
    tr.appendChild(td1);
    var td2 = document.createElement('td');
    td2.appendChild(document.createTextNode(arrayResult[i].dimensions[1]));
    tr.appendChild(td2);
    var td3 = document.createElement('td');
    td3.appendChild(document.createTextNode(arrayResult[i].dimensions[2]));
    tr.appendChild(td3);
    var td4 = document.createElement('td');
    td4.appendChild(document.createTextNode(arrayResult[i].metrics[0].values[0]));
    tr.appendChild(td4);
    tbdy.appendChild(tr);
  }

  tbl.appendChild(tbdy);
  body.appendChild(tbl);
}