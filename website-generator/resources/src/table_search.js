/*
 * SPDX-License-Identifier: Apache-2.0
 */

// Table search
(function () {
  function onSearch (inputId, tableId) {
    const input = document.getElementById(inputId);
    const filter = input.value.toLowerCase();
    const table = document.getElementById(tableId);
    const testNames = table.getElementsByClassName('testName');
    const allBackendsResults = table.getElementsByClassName('backendResults');
    const showPassed = document.getElementById('showPassed').checked;
    const showFailed = document.getElementById('showFailed').checked;
    let testStatus = ''

    if (showPassed && !showFailed){
      testStatus = 'Passed';
    }
    else if (showFailed && !showPassed){
      testStatus = "Failed"
    }
    for (let i = 0; i < testNames.length; i++) {
      const testNameText = testNames[i].textContent || testNames[i].innerText;
      for (let j = 0; j < allBackendsResults.length; j++) {
        const backendResults = allBackendsResults[j].getElementsByClassName('testResult');
        if (testNameText.toLowerCase().indexOf(filter) < 0 ||  (testStatus !== '' && backendResults[i].textContent.trim() !== testStatus)) {
          testNames[i].style.display = 'none';
          backendResults[i].style.display = 'none';
        } else {
          testNames[i].style.display = '';
          backendResults[i].style.display = '';
        }
      }
    }
  }
  window.onSearch = onSearch;
})();
