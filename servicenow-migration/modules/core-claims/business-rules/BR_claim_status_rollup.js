(function executeRule(current, previous /*null when async*/) {
  var charged = parseFloat(current.u_total_charge_amount || 0);
  var paid = parseFloat(current.u_total_paid_amount || 0);

  if (current.u_status == 'void') {
    return;
  }

  if (paid <= 0 && current.u_status == 'paid') {
    current.u_status = 'submitted';
    return;
  }

  if (paid >= charged && charged > 0) {
    current.u_status = 'paid';
    return;
  }

  if (paid > 0 && paid < charged && current.u_status != 'denied') {
    current.u_status = 'partial_paid';
  }
})(current, previous);
