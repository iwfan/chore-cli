const Listr = require('listr');


const tasks = new Listr([
  {
    title: 'log 1',
    task: (ctx, task) => {
      tasks.add({
        title: '111',
        task: () => {console.log(1)}
      })
    },
    skip: ctx => console.log(ctx)
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
