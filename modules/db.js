module.exports = class DB {
  constructor() {
    this.users = [];
    this.lists = [];
  }

  getListsBelongingToUser(userId) {
    const isCorrectList = (list) => {
      return list.userId == userId;
    };
    const lists = this.lists.filter(isCorrectList);

    return lists;
  }

  getList(listID) {
    const isCorrectList = (list) => {
      return list.id == listID;
    };
    const index = this.lists.findIndex(isCorrectList);

    return index >= 0 ? this.lsts[index] : null;
  }

  updateList(listID, name, userID, items) {
    const isCorrectList = (list) => {
      return list.id == listID;
    };
    const index = this.lists.findIndex(isCorrectList);

    if (index >= 0) {
      const list = this.lists[index];
      list.name = name;
      list.userId = userID;
      list.items = items;
      this.lists[index] = list;
    }

    return index >= 0 ? this.lists[index] : null;
  }

  deleteList(listID) {
    const isCorrectID = (list) => list.id == listID;
    const index = this.lists.findIndex(isCorrectID);

    if (index) {
      this.lists.slice(index);
    }

    return index ? true : false;
  }

  addList(name, userId) {
    const list = {
      id: this.lists.length + 1,
      name,
      userId,
      items: [],
    };
    this.lists.push(list);
    return list;
  }

  // -------------------------------------------------------

  addUser(name, email, password) {
    const user = {
      id: this.users.length + 1,
      name,
      email,
      password,
    };
    this.users.push(user);
    return user;
  }

  deleteUser(userId) {
    const isCorrectID = (user) => user.id == userId;
    const index = this.users.findIndex(isCorrectID);

    if (index) {
      this.users.slice(index);
    }

    return index ? true : false;
  }

  findUser(email, password) {
    const isCorrectUser = (user) => {
      return user.email == email && user.password == password;
    };
    const index = this.users.findIndex(isCorrectUser);

    return index >= 0 ? this.users[index] : null;
  }

  updateUser(userId, name, email, password) {
    const isCorrectID = (user) => user.id == userId;
    const index = this.users.findIndex(isCorrectID);

    if (index) {
      let user = this.users[index];
      user.name = name;
      user.email = email;
      user.password = password;

      this.users[index] = user;
    }

    return index ? this.users[index] : null;
  }
};
