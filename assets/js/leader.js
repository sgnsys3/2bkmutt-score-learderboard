var client = io()
var sectionCount = new Array(6);
var rangeData;
for(i=0;i<6;i++) sectionCount[i] = 0;
client.emit('requireData')
client.on('returnData', function (data) {
  rangeData = data.successRangeData
  for(i=0;i<6;i++) sectionCount[i] = 0;
  for(i=1;i<6;i++) {
    data.sectionData[i].forEach(function (v,k) {
      if(k != 0) {
        if(v === true) sectionCount[i]++;
      }
    })
    console.log('Section: ' + i + ' Success: ' + sectionCount[i])
  }
  updateBoard ()
})

client.on('updateData', function (data) {
  rangeData = data.successRangeData
  for(i=0;i<6;i++) sectionCount[i] = 0;
  for(i=1;i<6;i++) {
    data.sectionData[i].forEach(function (v,k) {
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
    success: '[success] parseInt',
    section: '[section] parseInt',
    successRange: '[success-range] parseInt'
  },
  layoutMode: 'vertical',
  vertical: {
    horizontalAlignment: 0.5
  }
})

function updateBoard () {
  for(i=1;i<6;i++) {
    $('#card-section-'+i).attr('success-range', rangeData[i])
    $('#card-section-'+i).attr('success', sectionCount[i])
    $('#progress-percent-section-'+i).css('width', (sectionCount[i]*100)/9.0+'%')
    $('#section-id-'+i).css('color', 'rgb('+ (244-((sectionCount[i]-1)*20)) +',' + (67 + ((sectionCount[i]-1)*13)) + ',' + (36 + ((sectionCount[i]-1)*2)) + ')')
    $('#progress-percent-section-'+i).css('background-color', 'rgb('+ (244-((sectionCount[i]-1)*20)) +',' + (67 + ((sectionCount[i]-1)*13)) + ',' + (36 + ((sectionCount[i]-1)*2)) + ')')
    $('#progress-section-'+i).html((sectionCount[i] == 9 ? 'SUCCESSFUL!!' : sectionCount[i]))
  }
  $grid.isotope('reloadItems')
  $grid.isotope({ 
    sortBy: ['success', 'successRange','section'],
    sortAscending: {
      success: false,
      successRange: true,
      section: true
    }
  })
}