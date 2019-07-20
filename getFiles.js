/**
 * @names getFiles
 * @author JungHyunKwon
 * @since 2019-02-05
 * @param {obejct} options {
 *     directory : string,
 *	   recursive : boolean,
 * }
 * @param {function} callback {string, object}
 */

'use strict';

const fs = require('fs');

/**
 * @param {obejct} options {
       directory : string,
	   recursive : boolean
   }
   @param {function} callback {array}
 * @since 2019-02-05
 */
function getFiles(options, callback) {
	//함수일 때
	if(typeof callback === 'function') {
		let result = [];

		//객체일 때
		if(options) {
			let optionsDirectory = options.directory;

			fs.readdir(optionsDirectory, (err, directories) => {
				//오류가 있을 때
				if(err) {
					callback(result);
				}else{
					let directoriesLength = directories.length,
						optionsRecursive = options.recursive;

					//불리언이 아닐 때
					if(typeof optionsRecursive !== 'boolean') {
						optionsRecursive = false;
					}

					(function loopDirectories(index) {
						//개수만큼 반복
						if(directoriesLength > index) {
							let directory = optionsDirectory + '/' + files[index];

							fs.stat(directory, (err, stats) => {	
								let nextIndex = index + 1;

								//오류가 있을 때
								if(err) {
									loopDirectories(nextIndex);
								}else{
									//파일일 때
									if(stats.isFile()) {
										result.push(directory);
										
										loopDirectories(nextIndex);

									//재귀이면서 폴더일 때
									}else if(optionsRecursive && stats.isDirectory()) {
										getFiles({
											directory : directory,
											recursive : optionsRecursive
										}, files => {
											result = result.concat(files);

											loopDirectories(nextIndex);
										});
									}else{
										loopDirectories(nextIndex);
									}
								}
							});
						}else{
							callback(result);
						}
					})(0);
				}
			});
		}else{
			callback(result);
		}	
	}
}

module.exports = getFiles;