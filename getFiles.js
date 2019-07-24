/**
 * @names getFiles
 * @author JungHyunKwon
 * @since 2019-02-05
 * @param {obejct} options {
       directory : string,
	   recursive : boolean
   }
   @param {function} callback {array}
 */

'use strict';

const fs = require('fs');

function getFiles(options, callback) {
	//함수일 때
	if(typeof callback === 'function') {
		let result = [];

		//객체일 때
		if(options) {
			let baseDirectory = options.directory;

			fs.readdir(baseDirectory, (err, directories) => {
				//오류가 있을 때
				if(err) {
					callback(result);
				}else{
					let directoriesLength = directories.length,
						recursive = options.recursive;

					//불리언이 아닐 때
					if(typeof recursive !== 'boolean') {
						recursive = false;
					}

					(function loopDirectories(index) {
						//개수만큼 반복
						if(directoriesLength > index) {
							let directory = baseDirectory + '/' + files[index];

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
									}else if(recursive && stats.isDirectory()) {
										getFiles({
											directory : directory,
											recursive : recursive
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