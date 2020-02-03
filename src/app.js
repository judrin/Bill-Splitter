import BillSplitter from './controllers/BillSplitter';
import * as UI from './controllers/UI';

// controller
(() => {
  const billSplitter = new BillSplitter();

  // Add a member to the member list
  document.getElementById('add-member').addEventListener('click', () => {
    // Get member input data {name, price}
    const data = UI.getMemberInput();

    if (!data.name || !data.price) {
      console.log('Invalid member data');
      return false;
    }

    const member = billSplitter.addMember(data.name, data.price);

    // Add a member to the screen
    document.getElementById('member-list').insertAdjacentHTML('beforeend', UI.getMemberHTML(member));

    // Clear current input data
    UI.clearMemberInput();
  });

  // Remove a member from the member list
  document.getElementById('member-list').addEventListener('click', (e) => {
    if (!e.target || (e.target.id !== 'remove-member' && e.target.parentNode.id !== 'remove-member'))
      return false;

    const target = e.target.closest('.member');

    if (!target) return false;

    billSplitter.removeMember(target.id);

    // Remove a member from the screen
    target.parentNode.removeChild(target);
  });

  // Calculate and split the bill
  document.getElementById('split-btn').addEventListener('click', () => {
    // Get tip and tax input data {tax, tip}
    const data = UI.getExtraInput();

    // check only tax value, a default value of tip is 0
    if (!data.tax) {
      console.log('Invalid tax data');
      return false;
    }

    const updatedData = billSplitter.calculate(data.tax, data.tip);
    UI.updateOverview(updatedData);
    UI.disableMemberInput();
  });
})();