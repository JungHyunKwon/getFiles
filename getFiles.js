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
	   recursive : boolean,
   }
   @param {function} callback {string}
 * @since 2019-02-05
 */
function getFiles(options, callback) {
	//객체일 때
	if(options) {
		let directory = options.directory;

		fs.readdir(directory, (err, files) => {
			//오류가 없을 때
			if(!err) {
				let filesLength = files.length,
					recursive = options.recursive,
					callbackIsFunction = typeof callback === 'function';

				//불리언이 아닐 때
				if(typeof recursive !== 'boolean') {
					recursive = false;
				}

				(function loopFiles(index) {
					//파일 개수만큼 반복
					if(filesLength > index) {
						let fileDirectory = directory + '/' + files[index];

						fs.stat(fileDirectory, (err, stats) => {						
							//오류가 없을 때
							if(!err) {
								//함수이면서 파일일 때
								if(callbackIsFunction && stats.isFile()) {
									callback(fileDirectory);

								//재귀이면서 폴더일 때
								}else if(recursive && stats.isDirectory()) {
									options.directory = fileDirectory;

									getFiles(options, callback);
								}
							}

							loopFiles(index + 1);
						});	
					}
				})(0);
			}
		});
	}
}

module.exports = getFiles;