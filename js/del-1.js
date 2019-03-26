document.querySelector('.report').addEventListener('submit', function(event) {
  event.preventDefault();
 // alert('test');
 
  // fetch project selection value
  if(document.querySelector('select[name=project]').value === ''){
    alert("You must select a project!");
    return false;
  } else {
    var project = document.querySelector('select[name=project]').value;
  }; 
  
  //fetch activity selection value
  if(document.querySelector('select[name=activity]').value === ''){
    alert("You must select an activity!");
    return false;
  } else {
    var activity = document.querySelector('select[name=activity]').value;
  };
  
  //fetch notes input value
  var notes = document.querySelector('textarea[name=note]').value;

  //fetch starting hour value
  var fromInput = document.getElementsByName('from');
    for(i = 0; i < fromInput.length; i++){
      var start = fromInput[i].value;
    };
   
  //check if valid format
  re = /^\d{1,2}:\d{2}([ap]m)?$/;
 try {
    start != '' && !start.match(re)
    }
    catch(error) {
      alert("Invalid time format! Please insert hh:mm");
      return false;
    };
   
 //fetch finishing hour value
  var toInput = document.getElementsByName('to');
    for(i = 0; i < toInput.length; i++){
    var finish = toInput[i].value;
  };

  //check if valid format
  re = /^\d{1,2}:\d{2}([ap]m)?$/;
  try {
    finish != '' && !finish.match(re)
    }
    catch(error) {
      alert("Invalid time format! Please insert hh:mm");
      return false;
    };
  
  //save all input as an object
  var dayWork = {
    "project" : project,
    "activity": activity,
    "startingHour": start,
    "finishingHour": finish,
    "memo": notes
   // "total": totalHours
  };
 
  // create a row for every submission
  var table = document.querySelector('tbody');
  var row = table.insertRow(-1);
  
  // create cell for every value in the object.
  for (var i = 0; i < Object.values(dayWork).length; i++){ 
  var projectCell = row.insertCell(-1);
  projectCell.classList.add(Object.keys(dayWork)[i]);
  projectCell.appendChild(document.createTextNode(Object.values(dayWork)[i]));

  };
  // add remove button
   var remove = document.createElement('button');
   remove.classList.add('action-delete');
   remove.innerHTML = "remove";
   var removeCell = row.insertCell(-1)
   removeCell.appendChild(remove);
   
  //add edit button
  var edit = document.createElement('button');
  edit.classList.add('action-edit');
  edit.innerHTML = "edit";
  removeCell.appendChild(edit); 

  //Change time format to string to calculate time difference 
  start = start.split(":");
  finish = finish.split(":");
  var startDate = new Date(0, 0, 0, start[0], start[1], 0);
  var endDate = new Date(0, 0, 0, finish[0], finish[1], 0);
  var diff = endDate.getTime() - startDate.getTime();
  var hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= hours * 1000 * 60 * 60;
  var minutes = Math.floor(diff / 1000 / 60);
  

  // need to add hours and minutes for each submit
  var totalhours = "";

  // convert diff result to hh:mm format
  var totalHours = (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;
  var totalCell = document.querySelector('td[colspan="7"]');
  totalCell.innerHTML = "Summa total tid:" + totalHours;

});

//delete function
document.body.addEventListener('click', function(e) {
  var target = e.target;

  if (target.classList.contains('action-delete')) {
    if(confirm('Are you sure you want to delete this log?')){
      var rows = document.querySelector('table tbody');
      rows.removeChild(target.parentElement.parentElement);
    } else {
      e.stopPropagation();
    }
  }
    e.stopPropagation();
});

// edit function
document.body.addEventListener('click', function(e) {
  var target = e.target;

  // check if button pressed is edit button
  //if yes select the row it belongs to
  if (target.classList.contains('action-edit')) {
  var row = e.target.parentNode.parentNode;

  // Fetch all the values from the row
  var project = row.querySelector('.project');
  var activity = row.querySelector('.activity');
  var start = row.querySelector('.startingHour');
  var end = row.querySelector('.finishingHour');
  var memo = row.querySelector('.memo');
  var buttons = row.lastElementChild;

  // Add input/select in all tds and fill it out with the right value
  project.innerHTML = '<input type="text" name="project" value="'+project.textContent+'">';
  activity.innerHTML = '<input type="text" name="activity" value="'+activity.textContent+'">';
  start.innerHTML = '<input type="text" name="start" value="'+start.textContent+'">';
  end.innerHTML = '<input type="text" name="end" value="'+end.textContent+'">';
  memo.innerHTML = '<input type="text" name="memo" value="'+memo.textContent+'">';

  //add sumbmit button
  buttons.innerHTML = '<input class="action-save" type="submit" name="save" value="save">';
  }
    e.stopPropagation();
}); 

document.body.addEventListener('click', function(e){
  var target = e.target;
  if (target.classList.contains('action-save')){
    var row = e.target.parentNode.parentNode;

    // Fetch all the values from the row
    var project = row.querySelector('.project');
    var activity = row.querySelector('.activity');
    var start = row.querySelector('.startingHour');
    var end = row.querySelector('.finishingHour');
    var memo = row.querySelector('.memo');
    var buttons = row.lastElementChild;

    // Fetch all the edited values
    var editedProject = (row.querySelector('input[name = project]').value);
    var editedActivity = (row.querySelector('input[name = activity]').value);
    var editedStart = (row.querySelector('input[name = start]').value);
    var editedEnd = (row.querySelector('input[name = end]').value);
    var editedMemo = (row.querySelector('input[name = memo]').value);

    // Replace input fields with new value
    project.innerHTML = editedProject;
    activity.innerHTML = editedActivity;
    start.innerHTML = editedStart;
    end.innerHTML = editedEnd;
    memo.innerHTML = editedMemo;
    buttons.innerHTML = '<button class="action-delete">remove</button><button class="action-edit">edit</button>';
    }
      e.stopPropagation();
  });












