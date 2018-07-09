function Utils() {
}

Utils.verifyNANPNumber = function (number) {
	const regex = /+1[2-9][0-9]{2}[2-9][0-9]{6}/;
	return regex.test(number);
};

module.exports = Utils;
