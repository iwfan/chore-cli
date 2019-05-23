const Listr = require('listr');


const tasks = new Listr([
  {
    title: 'log 1',
    task: () => console.log(1)
  },
  {
    title: 'thorw error',
    task: () => {
      throw new Error('xx')
    }
  }
])


tasks.run().catch(e => {
  // console.log(e);
})
