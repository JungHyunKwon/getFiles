/**
 * @names getFiles
 * @author JungHyunKwon
 * @since 2019-02-05
 */

'use strict';

const fs = require('fs');

/**
 * @param {obejct} options {
       directory : string,
	   recursive : boolean,
   }
   @param {function} callback {string, object}
 * @since 2019-02-05
 */
module.exports = (options, callback) => {
	//객체일 때
	if(options) {
		let directory = options.directory;
		
		//문자일 때
		if(typeof directory === 'string') {			
			//함수일 때
			if(typeof callback === 'function') {
				fs.readdir(directory, (err, files) => {
					//오류가 있을 때
					if(err) {
						console.error(directory + '를 읽을 수 없습니다.');
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
								let filepath = directory + '/' + files[index];

								fs.stat(filepath, (err, stats) => {
									//오류가 있을 때
									if(err) {
										console.error(filepath + '를 조회 할 수 없습니다.');

									//파일일 때
									}else if(stats.isFile()) {
										callback(filepath, stats);
									
									//재귀이면서 폴더일 때
									}else if(recursive && stats.isDirectory()) {
										options.directory = filepath;

										getFiles(options, callback);
									}

									loopFiles(index + 1);
								});	
							}
						})(0);
					}
				});
			}else{
				console.error('callback : 함수가 아닙니다.');
			}
		}else{
			console.error('directory : 문자가 아닙니다.');
		}
	}else{
		console.error('options : 객체가 아닙니다.');
	}
};