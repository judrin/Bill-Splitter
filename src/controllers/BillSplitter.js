class BillSplitter {
  constructor() {
    this.members = [];
    this.subtotal = 0;
    this.totalTip = 0;
    this.totalAmount = 0;
  }

  addMember(name, price) {
    const member = {
      id: 'member-' + Date.now(),
      name: name,
      price: price,
      calculatedValue: 0
    }

    this.members.push(member);

    return member;
  }

  removeMember(id) {
    const index = this.members.findIndex(member => member.id === id);

    if (index !== -1)
      return this.members.splice(index, 1);

    return null;
  }

  calculate(tax, tip) {
    const calculatedData = {
      members: []
    };

    this.members.forEach((member) => {
      const taxAmount = member.price * (tax / 100);
      const tipAmount = member.price * (tip / 100);

      // The total price of each member
      member.calculatedValue = member.price + taxAmount + tipAmount;

      // Push member id and calculated to the array
      calculatedData.members.push({
        id: member.id,
        updatedAmount: member.calculatedValue
      });

      this.subtotal += taxAmount;
      this.totalTip += tipAmount;
      this.totalAmount += member.calculatedValue;

      calculatedData.subtotal = this.subtotal;
      calculatedData.totalTip = this.totalTip;
      calculatedData.totalAmount = this.totalAmount;
    });

    return calculatedData;
  }
}

export default BillSplitter;