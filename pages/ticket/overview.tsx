import { H1, H2, Paragraph, Section } from 'components/atoms/ContentWrappers'
import { LocalNavigation } from 'components/molecules/LocalNavigation'
import TicketTableRow from 'components/molecules/TicketTableRow'
import DefaultTable, { Contribution } from 'components/organisms/DefaultTable'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import i18next from 'i18next'
import _ from 'lodash'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { paths, ticketMenu } from 'routes/paths'
import { withNamespaces } from '../../i18n'
import { StoresType } from '../_app'

export type PropsType = {
  stores: StoresType;
  t: i18next.TFunction;
}

@inject('stores')
@observer
export class Ticket extends React.Component<PropsType> {
  tickets: Contribution[] = []

  static async getInitialProps() {
      return {
          namespacesRequired: ['ticket'],
      }
  }

  renderTicketsTablesRow = () => {
      return (
          this.tickets && this.tickets.map((ticket) => {
              return (
                  <TicketTableRow
                      ticket={ticket}
                  />
              )
          })
      )
  }

  render() {
    const { stores, t } = this.props
    const { schedule } = stores.scheduleStore

    this.tickets = [{
      title: '컨퍼런스 얼리버드',
      intlKey: 'ticket:conference.earlybird.title',
      openDate: schedule.keynoteRecommendationStartAt,
      link: paths.contribute.recommendingAKeynoteSpeaker,
    }, {
      title: '컨퍼런스 개인 후원',
      intlKey: 'ticket:conference.patron.title',
      openDate: schedule.presentationProposalStartAt,
      closeDate: schedule.presentationProposalFinishAt,
      link: paths.contribute.cfpDetailedGuide
    }, {
      title: '컨퍼런스 일반',
      intlKey: 'ticket:conference.general.title',
      openDate: schedule.tutorialProposalStartAt,
      closeDate: schedule.tutorialProposalFinishAt,
      // link: paths.contribute.proposingATutorial
    }, {
      title: '튜토리얼',
      intlKey: 'ticket:tutorial.title',
      openDate: schedule.sprintProposalStartAt,
      // link: paths.contribute.proposingASprint
    }, {
      title: '스프린트',
      intlKey: 'ticket:sprint.title',
      openDate: schedule.volunteerRecruitingStartAt,
      closeDate: schedule.volunteerRecruitingFinishAt,
    }, {
      title: '영코더',
      intlKey: 'ticket:youngcoder.title',
      openDate: schedule.volunteerRecruitingStartAt,
      closeDate: schedule.volunteerRecruitingFinishAt,
    }, {
      title: '아이 돌봄',
      intlKey: 'ticket:childcare.title',
      openDate: schedule.volunteerRecruitingStartAt,
      closeDate: schedule.volunteerRecruitingFinishAt,
    }]

    return (
      <PageTemplate
        header={<Header title='파이콘 한국 티켓 종류 :: 파이콘 한국 2019' intlKey='ticket.overview.pageTitle' />}
        footer={<Footer />}
      >
        <LocalNavigation list={ticketMenu.submenu} />
        <H1>
          {`${t('constant:pyconKorea.nameOnly')} ${t('ticket:overview.title')}`}
        </H1>
        <Paragraph>
          {t('ticket:overview.description')}
        </Paragraph>
        <DefaultTable
          stores={stores}
          renderTableRow={this.renderTicketsTablesRow}
        />
        <Section>
          <H2>{t('common:contact')}</H2>
          <Paragraph><a href='mailto:program@pycon.kr'>program@pycon.kr</a></Paragraph>
        </Section>
      </PageTemplate>
    )
  }
}

export default withNamespaces(['ticket'])(Ticket)
