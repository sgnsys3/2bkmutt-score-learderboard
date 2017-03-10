var client = io()
var sectionCount = new Array(6);
for(i=0;i<6;i++) sectionCount[i] = 0;
client.emit('requireData')
client.on('returnData', function (data) {
  for(i=0;i<6;i++) sectionCount[i] = 0;
  for(i=1;i<6;i++) {
    data[i].forEach(function (v,k) {
      if(k != 0) {
        if(v === true) sectionCount[i]++;
      }
    })
    console.log('Section: ' + i + ' Success: ' + sectionCount[i])
  }
  updateBoard ()
})

client.on('updateData', function (data) {
  for(i=0;i<6;i++) sectionCount[i] = 0;
  for(i=1;i<6;i++) {
    data[i].forEach(function (v,k) {
      if(k != 0) {
        if(v === true) sectionCount[i]++;
      }
    })
    console.log('Section: ' + i + ' Success: ' + sectionCount[i])
  }
  updateBoard ()
})

var $grid = $('.grid').isotope({
  getSortData: {
    success: '.base-success parseInt',
    section: '[section] parseInt'
  },
  layoutMode: 'vertical',
  vertical: {
    horizontalAlignment: 0.5
  }
})

function updateBoard () {
  for(i=1;i<6;i++) {
    $('#progress-percent-section-'+i).css('width', (sectionCount[i]*100)/9.0+'%')
    $('#progress-section-'+i).html(sectionCount[i])
  }
  $grid.isotope('reloadItems')
  $grid.isotope({ 
    sortBy: ['success', 'section'],
    sortAscending: {
      success: false,
      section: true
    }
  })
}