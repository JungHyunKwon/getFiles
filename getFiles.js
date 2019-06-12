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
			let directory = options.directory;

			fs.readdir(directory, (err, files) => {
				//오류가 있을 때
				if(err) {
					callback(result);
				}else{
					let filesLength = files.length,
						recursive = options.recursive;

					//불리언이 아닐 때
					if(typeof recursive !== 'boolean') {
						recursive = false;
					}

					(function loopFiles(index) {
						//파일 개수만큼 반복
						if(filesLength > index) {
							let fileDirectory = directory + '/' + files[index];

							fs.stat(fileDirectory, (err, stats) => {	
								let nextIndex = index + 1;

								//오류가 없을 때
								if(err) {
									loopFiles(nextIndex);
								}else{
									//함수이면서 파일일 때
									if(stats.isFile()) {
										result.push(fileDirectory);
										
										loopFiles(nextIndex);

									//재귀이면서 폴더일 때
									}else if(recursive && stats.isDirectory()) {
										getFiles({
											directory : fileDirectory,
											recursive : recursive
										}, directories => {
											result = result.concat(directories);

											loopFiles(nextIndex);
										});
									}else{
										loopFiles(nextIndex);
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