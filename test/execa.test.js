const execa = require('execa');
const chalk = require('chalk');
const Listr = require('listr');

// const result = execa('git', ['init'], {
//   cwd: './cli',
// }).then(data => {
//   console.log(data);
// }).catch(e => {
//   console.log(e.message);
// });

const tasks = new Listr([
	{
		title: 'Success',
		task: () => Promise.resolve('Foo')
	},
	{
		title: 'Failure',
		task: () => Promise.reject(new Error('Bar'))
	}
]);

tasks.run().catch(e => {
	console.log(e.message);});
