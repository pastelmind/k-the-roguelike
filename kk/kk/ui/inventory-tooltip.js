/**
 * @author 강예형
 * 스마트한 툴팁 (마우스를 아이콘에서 툴팁으로 옮겨도 사라지지 않음)
 */

/* global $ */

$.widget('kk.smartTooltip', $.ui.tooltip, {
  options: {
    show: 'fast'
  },
  open: function (event) {
    this._superApply(arguments);
    
    var that = this;
    for (var id in this.tooltips) {
      this.tooltips[id].tooltip.on('mouseleave', function () {
        that.close();
      });
    }
  },
  close: function (event) {
    //아직도 확실히 이해되지 않는 부분
    //jQuery UI 1.12.1의 tooltip.js 소스 코드를 참고하였음
    //(https://github.com/jquery/jquery-ui/blob/1.12.1/ui/widgets/tooltip.js)
    var target = $(event ? event.currentTarget : this.element),
      tooltipData = this._find(target),
      tooltip = tooltipData ? tooltipData.tooltip : null;
    
    if (tooltip && !tooltip.data('hasSmartTooltipEventHandler')) {
      var that = this;
      tooltip.data('hasSmartTooltipEventHandler', true)
        .on('mouseenter', function () {
          that.open();
        });
    }
    
    return this._superApply(arguments);
  }
});
