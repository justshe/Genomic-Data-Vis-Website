function sortByName() {
  var list, i, switching, b, shouldSwitch;
  list = document.getElementsByClassName("filterDiv");
  switching = true;
  while (switching) {
    switching = false;
    b = list;
    for (i = 0; i < (b.length - 1); i++) {
      shouldSwitch = false;
      if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}



function sortByCitation() {
  var list, b, switching, counts;
  list = document.getElementsByClassName("filterDiv");
  switching = true;
  b = list;
  counts = [];
  getCiteCount(counts, b, switching);
}

function getCiteCount(counts, b, switching) {
  var myvar, words, i, citeCount, j;
  jQuery.get('../scholar_data.txt', function(data) {
    while (switching) {
      switching = false;
      for (i=0; i< (b.length); i++) {
        doi = b[i].className.split(" ")[1];
        myvar = data;
        words = myvar.split("\n");
        j=0;
        var citedby;
        while (j<words.length) {
          if (words[j] == "  doi: "+doi) {
            citedby = words[j+1];
            break;
          }
          j++;
        }
        citeCount = parseInt(citedby.substring(18, citedby.length));
        counts[i] = citeCount;
      }
      switching = makeSwitch(counts, b, switching);
    }
  });
}

function makeSwitch(counts, b, switching) {
  var shouldSwitch, i, currCount, nextCount;
  shouldSwitch = false;
  for (i = 0; i < (b.length - 1); i++) {
      shouldSwitch = false;
      currCount = counts[i];
      nextCount = counts[i+1];
      if (currCount < nextCount) {
        shouldSwitch = true;
        break;
      }
  }
  if (shouldSwitch) {
    b[i].parentNode.insertBefore(b[i + 1], b[i]);
    switching = true;
  }
  return switching;
}
