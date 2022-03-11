const pg = require('pg');
const dbURI = "postgres://pfudfpnjwhajsk:a04b4420957c0ef1ebd10d3228b5b0fa72e42f28e080947c13144745f81274b2@ec2-176-34-105-15.eu-west-1.compute.amazonaws.com:5432/dc6a8vohtss5cf";

module.exports = class DB {
  constructor() {
    this.users = [];
    this.lists = [];
    this.connstring = process.env.DATABASE_URL || dbURI;
    this.pool = new pg.Pool({
      connectionString: this.connstring,
      ssl: { rejectUnauthorized: false }
    });
  }



  async getListsBelongingToUser(userId) {
    /*const isCorrectList = (list) => {
      return list.userId == userId;
    };
    const lists = this.lists.filter(isCorrectList);

    return lists;*/
    let sql = "SELECT * FROM list WHERE userId = $1";
    let list = null;
    try {
      let result = await this.pool.query(sql, [userId]);
      if (result.rows.length > 0) {
        list = result.rows
      }
      else {
        throw "Could not create list";
      }
    }
    catch (err) {
      console.error(err);
      list = null;
    }

    return list
  
  }

 async getList(listID) {
   /* const isCorrectList = (list) => {
      return list.id == listID;
    };
    const index = this.lists.findIndex(isCorrectList);

    return index >= 0 ? this.lsts[index] : null;*/

    let sql = "SELECT * FROM list WHERE id = $1";
    let list = null;
    try {
      let result = await this.pool.query(sql, [listID]);
      if (result.rows.length > 0) {
        list = result.rows[0]
      }
      else {
        throw "Could not create list";
      }
    }
    catch (err) {
      console.error(err);
      list = null;
    }

    return list
  }

  async updateList(listID, name, userID, items) {
    /*const isCorrectList = (list) => {
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

    return index >= 0 ? this.lists[index] : null;*/

    let sql = "UPDATE lists SET listID = $1, name = $2, userID = $3, items = $4";
    let list = null;
    try {
      let result = await this.pool.query(sql, [listID, name, userID, items]);
      if (result.rows.length > 0) {
        list = result.rows[0]
      }
      else {
        throw "Could not update list";
      }
    }
    catch (err) {
      console.error(err);
      user = null;
    }

    return list

  }

  async deleteList(listID) {
    /**const isCorrectID = (list) => list.id == listID;
    const index = this.lists.findIndex(isCorrectID);

    if (index) {
      this.lists.slice(index);
    }

    return index ? true : false;*/

    let sql = "DELETE FROM list WHERE id = $1 RETURNING *";
    let values = [listID];
    let sucsses = false;

    try {
      let result = await this.pool.query(sql, values);
      if (result.rows.length > 0) {
        sucsses = true
      }
      else {
        throw "Could not delete list";
      }
    }
    catch (err) {
      console.error(err)
      sucsses = false
    }

    return sucsses
  }

  async addList(name, userId) {
    /*const list = {
      id: this.lists.length + 1,
      name,
      userId,
      items: [],
    };
    this.lists.push(list);
    return list;*/

    let sql = 'INSERT INTO lists ( name, userId, items) VALUES( $1, $2, $3) returning *';
    let values = [name, userId, "[]"];
    let lists = null;

    try {
      let result = await this.pool.query(sql, values);
      if (result.rows.length > 0) {
        lists = result.rows[0]
      }
      else {
        throw "Could not create lists";
      }
    }
    catch (err) {
      console.error(err);
      lists = null;
    }
    return lists;
  }

  // -------------------------------------------------------

  async addUser(name, email, password) {
    /*const user = {
      id: this.users.length + 1,
      name,
      email,
      password,
    };
    this.users.push(user);*/
  

    let sql = 'INSERT INTO users ( name, email, password) VALUES($1, $2, $3) returning *';
    let values = [name,email,password];
    let user = null;

    try {
      let result = await this.pool.query(sql, values);
      if (result.rows.length > 0) {
       user = result.rows[0]
      }
      else {
        throw "Could not create user";
      }
    }
    catch (err) {
      console.error(err);
      user = null;
    }
    return user;
  }

  async deleteUser(userId) {
    /*const isCorrectID = (user) => user.id == userId;
    const index = this.users.findIndex(isCorrectID);

    if (index) {
      this.users.slice(index);
    }

    return index ? true : false;*/

    let sql = "DELETE FROM users WHERE id = $1 RETURNING *";
    let values = [userId];
    let sucsses = false;

    try {
      let result = await this.pool.query(sql, values);
      if (result.rows.length > 0) {
        sucsses = true
      }
      else {
        throw "Could not delete user";
      }
    }
    catch (err) {
     console.error(err)
     sucsses = false
    }

    return sucsses
  }

  async findUser(email, password) {

    /*const isCorrectUser = (user) => {
      return user.email == email && user.password == password;
    };
    const index = this.users.findIndex(isCorrectUser);

    return index >= 0 ? this.users[index] : null;*/


   let sql = "SELECT * FROM users WHERE email = $1 AND password = $2 ";
   let user = null;
    try {
      let result = await this.pool.query(sql,[email,password]);
      if (result.rows.length > 0) {
        user = result.rows[0]
      }
      else {
        throw "Could not create user";
      }
    }
    catch (err) {
      console.error(err);
      user = null;
    }

    return user

  }

  async updateUser(userId, name, email, password) {
    /*const isCorrectID = (user) => user.id == userId;
    const index = this.users.findIndex(isCorrectID);

    if (index) {
      let user = this.users[index];
      user.name = name;
      user.email = email;
      user.password = password;

      this.users[index] = user;
    }

    return index ? this.users[index] : null;*/

    let sql = "UPDATE users SET name = $2, email = $3, password = $4 WHERE id = $1";
    let user = null;
    try {
      let result = await this.pool.query(sql, [userId, name, email, password]);
      if (result.rows.length > 0) {
        user = result.rows[0]
      }
      else {
        throw "Could not update user";
      }
    }
    catch (err) {
      console.error(err);
      user = null;
    }

    return user

  }
};
