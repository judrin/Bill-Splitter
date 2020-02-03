import { formatNumber } from '../utility/helper';

export const getMemberInput = () => {
  return {
    name: document.getElementById('add-name').value,
    price: parseFloat(document.getElementById('add-value').value) || null
  }
};

export const clearMemberInput = () => {
  document.getElementById('add-name').value = '';
  document.getElementById('add-value').value = ''
};

export const getMemberHTML = (data) => {
  return `
    <div class="member clearfix" id="${data.id}">
      <div class="member__name">${data.name}</div>
      <div class="right clearfix">
        <div class="member__value">${formatNumber(data.price)}</div>
        <div class="member__delete">
          <button class="member__delete--btn" id="remove-member">
            <i class="icon ion-ios-remove-circle-outline"></i>
          </button>
        </div>
      </div>
    </div>
  `
};

// UI helper that gets Tax and Tip value
// If the tip is empty or invalid, the default value is 0
export const getExtraInput = () => {
  return {
    tax: parseInt(document.getElementById('add-tax').value) || null,
    tip: parseInt(document.getElementById('add-tip').value) || 0
  }
}

export const updateOverview = (data) => {

  document.getElementById('member-list').classList.add('calculated');

  // Hide inputs and button in the extra container
  document.getElementById('extra').classList.add('hide');

  // Show overview box
  document.getElementById('overview').classList.remove('hide');

  // Insert updated amount to each member's box
  data.members.forEach((member) => {
    const html = `<div class="calculated__value"><i class="icon ion-ios-arrow-round-forward"></i> ${formatNumber(member.updatedAmount)}</div>`;
    document.querySelector(`#${member.id} .member__value`).insertAdjacentHTML('beforeend', html);
  });

  // Add subtotal, total tax, total tip, and total amount to the overview
  document.getElementById('subtotal-amount').textContent = formatNumber(data.subtotal);
  document.getElementById('tip-amount').textContent = formatNumber(data.totalTip);
  document.getElementById('total-amount').textContent = formatNumber(data.totalAmount);
};

export const disableMemberInput = () => {
  document.getElementById('add-name').disabled = true;
  document.getElementById('add-value').disabled = true;
  document.getElementById('add-member').disabled = true;
}
