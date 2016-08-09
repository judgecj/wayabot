Template.send.onRendered(function(){
  $('#sectional').formalize({
    timing: 400,
    nextCallBack: function(){
      if (validateEmpty($('#sectional .open'))){
        scrollToNewSection($('#sectional .open'));
        return true;
      };
      return false;
    },
    prevCallBack: function(){
      return scrollToNewSection($('#sectional .open').prev())
    }
  });

  $('input').on('keyup change', function(){
    $(this).closest($('.valid')).removeClass('valid');
  });

  function validateEmpty(section){
    var errors = 0;
    section.find($('.required-field')).each(function(){
      var $this = $(this),
        input = $this.find($('input'));
      if (input.val() === ""){
        errors++;
        $this.addClass('field-error');
        $this.append('\<div class="form-error-msg">This field is required!\</div>');
      }
    });
    if (errors > 0){
      section.removeClass('valid');
      return false;
    }
    section.find($('.field-error')).each(function(){
      $(this).removeClass('field-error');
    });
    section.find($('.form-error-msg')).each(function(){
      $(this).remove();
    });
    section.addClass('valid');
    return true;
  }

  function scrollToNewSection(section){
    var top = section.offset().top;
    $("html, body").animate({
      scrollTop: top
    }, '1000');
    return true;
  }
});