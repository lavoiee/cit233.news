
//assignment:     Project 4
//author:         Patrick McCormick-Zatolokin
//course:         CIT190
//created:        4/21/2016
//description:    
//revisions:     

// initialize array to hold Sales objects:
var salesArray = [];

// this puts the data collected on the customer-facing page in a special DIV on this page:
function showNow() {
    retrieveLocalStorage();
    document.getElementById("mainOutput").innerHTML = listSales();
}

//retrieve Sales from front end html
function retrieveLocalStorage() {
    // since localStorage doesn't store objects, we had to stringify them on the customer-facing page.
    //     here, we parse the strings so that JS will recognize them as objects.
    salesArray = JSON.parse(localStorage.getItem("storedSalesArray"));
    // I added a special function to sort by date, in case they are not entered in order.
    //     this is for fun, only. You needn't do this or understand it! 
    //     but you can ask me how it works during office hours, if you're curious.
    salesArray.sort(compareSaleDates);

}

// this filters the output and returns it in a potentially very long string to be displayed:
function listSales() {
    // first, we setup our variables:
    // init a variable to hold a list of what is in this array:
    // is this list sales function just used for filtering and storing the found sales so that can be used later???????????????
    var salesList = '';
    var filterType = 1;  
    var dateFrom = document.getElementById('dateFrom').value;
    var dateThru = document.getElementById('dateThru').value;

    // then we add another line to the screen to identify if there are from or thru dates.
    //     we also setup a 'filterType' variable that tells us (below) which records to output.
    if (dateFrom + dateThru !== '') {
        filterType = 1;    // no filter
        // filter for "from date"
        if (dateFrom !== '') {
            filterType = 2;     // from only
            salesList += 'From ' + dateFrom;
        }
        // filter for "thru date"
        if (dateThru !== '') {
            filterType = 3;     // thru only
            salesList += '  Thru ' + dateThru;
        }
        // filter for both from & thru
        if (dateFrom !== '' && dateThru !== '') {
            filterType = 4;     // from & thru
        }
        // add another blank line after from or thru dates:
        salesList += "<br /><br />";
    }

    // iterate through the array of filter types and display sales info if they match one of the filters
    for (var i = 0; i < salesArray.length; i++) {
        if (includeRecord(filterType, salesArray[i].saleDate, dateFrom, dateThru))
        {
            salesList +=
                salesArray[i].name + ", "
                + salesArray[i].saleDate + ", "
                + "Qty: " + salesArray[i].numberOfCigars + ", "
                + salesArray[i].cigarFlavor + ", ";
            // strip the last ", " off and add a line feed:
            salesList =
                salesList.substring(0, salesList.length - 2)
                + " - Order Price: $" + salesArray[i].orderPrice
                + "<br />";
        }
    }
    return salesList;
}

// this function switches on the filter type and chooses what sales to include in list
function includeRecord(filterType, saleDate, dateFrom, dateThru) {
    //declare boolean variable
    var includeRecord = false;
    switch(filterType) {
        case 2:
            if (saleDate >= dateFrom) {
                includeRecord = true;
            }
            break;
        case 3:
            if (saleDate <= dateThru) {
                includeRecord = true;
            }
            break;
        case 4:
            if (saleDate >= dateFrom && saleDate <= dateThru) {
                includeRecord = true;
            }
            break;
        default:
            includeRecord = true;
    }
    return includeRecord;
}

// this is a function to sort an array.
// I am using it to sort the objects by the dates they include.
// this is the advanced class, so don't worry about using it or understanding it!
// but if you want more info, see me during office hours.
function compareSaleDates(a, b) {
    if (Date.parse(a.saleDate) < Date.parse(b.saleDate))
        return -1;
    else if (Date.parse(a.saleDate) > Date.parse(b.saleDate))
        return 1;
    else
        return 0;
}