document.querySelector('.report').addEventListener('submit', function(event) {
  event.preventDefault();
 // alert('test');

  var project = document.querySelector('select[name=project]').value;
  //console.log(project);

  var activity = document.querySelector('select[name=activity]').value;
  //console.log(activity);

  var notes = document.querySelector('textarea[name=note]').value;
  //console.log(notes);

  var fromInput = document.getElementsByName('from');
   for(i = 0; i < fromInput.length; i++){
    var start = fromInput[i].value;
   // start = parseInt(start);
  };
  //console.log(start);

  var toInput = document.getElementsByName('to');
    for(i = 0; i < toInput.length; i++){
    var finish = toInput[i].value;
   // finish = parseInt(finish)
  };

  //var totalHours = finish - start;
  //console.log(totalHours);


  // create a new project array
  var workDay = [project, activity, start, finish, notes];
  
  /*
  var dayWork = {
    "project" : project,
    "activity": activity,
    "memo": notes,
    "statingHour": start,
    "finishingHour": finish,
   // "total": totalHours
  };
  */

  // create a row for every subission
  var table = document.querySelector('tbody');
  var row = table.insertRow(-1);

  for (var i = 0; i < workDay.length; i++){ 
    var projectCell = row.insertCell(-1)
    projectCell.appendChild(document.createTextNode(workDay[i]));

  };
   // add remove button
   var remove = document.createElement('button');
   remove.classList.add('action-delete');
   remove.innerHTML = "remove";
   var removeCell = row.insertCell(-1)
   removeCell.appendChild(remove);
});

document.body.addEventListener('click', function(e) {
  var target = e.target;
  if (target.nodeName === 'button') {
      alert("hello");
  }
  e.stopPropagation()
});












