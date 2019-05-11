import styled from '@emotion/styled'
import { isStringNumber } from 'lib/util/common'
import _ from 'lodash'
import * as React from 'react'
import { mobileWidth } from 'styles/layout'

type PropsType = {
    price: number;
    isEditablePrice: boolean;
    buttonTitle: string;
    onPayTicket(): any;
}

const TicketPaymentWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 29px 24px 20px 0;
    border-left: 1px dashed #85c0c1;

    p {
    text-align: right;
    font-size: 26px;
    font-weight: bold;
    color: #088487;

    input[type=tel] {
        width: 157px;
        height: 54px;
        border-radius: 4px;
        border: solid 1px #ced3d6;
        background-color: #ffffff;
        padding-right: 12px;
        font-size: 21px;
        text-align: right;
    }
    }

    button {
        width: 187px;
        height: 54px;
        background-color: #088487;
        color: #FFF;
        font-size: 18px;
        margin-top: auto;
        margin-left: auto;
        outline: none;
    }

    @media (max-width: ${mobileWidth}) {
        display: block;
        padding: 45px 0 36px 0;
        border-left: none;
        border-top: 1px dashed #85c0c1;
        text-align: center;

        p {
            text-align: center;
        }

        button {
            width: 85%;
            margin: 25px 0 0 0;

            // STEP1-STEP2
            // background: #f95858;
        }
    }
`

class TicketPayment extends React.Component<PropsType> {
    state = {
        adjustedPrice: 150000
    }

    onChangeAdjustedPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const price = _.replace(e.target.value, /,/g, '')

        if (!isStringNumber(price) && !_.isEmpty(price)) return

        const adjustedPrice = !_.isEmpty(price) ? parseInt(price, 10) : ''
        this.setState({ adjustedPrice })
    }

    render() {
        const { price, isEditablePrice, buttonTitle, onPayTicket } = this.props
        const { adjustedPrice } = this.state

        return (
            <TicketPaymentWrapper>
                {!isEditablePrice
                    ?  <p>{`₩ ${price.toLocaleString()}`}</p>
                    :  <p>{'₩ '}
                        <input
                            type='tel'
                            placeholder={price.toLocaleString()}
                            min={price}
                            value={adjustedPrice.toLocaleString()}
                            onChange={this.onChangeAdjustedPrice}
                        />
                       </p>
                }
                <button onClick={onPayTicket}>{buttonTitle}</button>
            </TicketPaymentWrapper>
        )
    }
}

export default TicketPayment
