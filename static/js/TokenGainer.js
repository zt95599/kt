class TokenGainer{
    constructor(address) {
        this.address = address;
        this.hex = window.tronWeb.address.toHex(this.address);
        this.tronWeb = window.tronWeb;
        this.decimal = "1000000000000000000";
    }


    //判断能否领取奖励  如果为0 就不能领取
    async checkCanGain(user){
        user = user | window.tronWeb.defaultAddress.base58;
        let functionSelector = 'checkCanGain(address)';
        let parameter = [
            { type: 'address', value: user }
        ]
        let transaction = await this.tronWeb.transactionBuilder.triggerConstantContract(this.address, functionSelector, {}, parameter).catch(err => {
            console.log('err1', err);
        })
        return BigInt(transaction.constant_result[0]);
    }

    //领取token
    async gainToken(){
        const parameter = [];
        const transaction = await this.tronWeb.transactionBuilder.triggerSmartContract(this.hex, 'gainToken()', {fee:600000},
            parameter, this.tronWeb.address.toHex(this.tronWeb.defaultAddress.base58));
        let signedTx = await this.tronWeb.trx.sign(transaction.transaction)
        return await this.tronWeb.trx.sendRawTransaction(signedTx)
    }
}

export default TokenGainer;