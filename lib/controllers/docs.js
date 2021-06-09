const { Router } = require('express');

module.exports = Router()
  .get('/', (req, res) => {
    res.render(
      'docs',
      { 
        title: 'Trek-Dex-API', 
        message: 'documentation' 
      }
    );
  });
