// Include library
var React     = require('react');
var ReactDOM  = require('react-dom');

// Include dependency
var Navbar    = require('components/navbar.js');
var Footer    = require('components/footer.js');
var langStore = require('stores/lang.js');
var datas     = require('dataloaders/sponsor.js').getAll();

// Implement index page
var Sponsor = React.createClass({
    render: function() {
        var data = this.props.data;
        var lang = this.props.lang;
        return (
            <section role="sponsor">
                <div role="sponsor-logo">
                    <a href={data.url}>
                        <img src={data.logoUrl} />
                    </a>
                </div>
                <div role="sponsor-text">
                    <header>{data.name[lang]}</header>
                    <article>
                        {data.description[lang]}
                    </article>
                </div>
                <div role="clear-float"></div>
            </section>
        );
    }
});

var SponsorClass = React.createClass({
    render: function() {
        var data     = this.props.data;
        var lang     = this.props.lang;
        var sponsors = data.sponsors.map(function(sponsor, idx) {
            return (
                <Sponsor
                    key={idx} 
                    data={sponsor}
                    lang={lang} />
            );
        });
        return (
            <section role="sponsor-class">
                <header>{data.className[lang]}</header>
                {sponsors}
            </section>
        );
    }
});

var Sponsorlist = React.createClass({
    getInitialState: function() {
        return {lang: langStore.getState()};
    },
    changeHandler: function() {
        this.setState({lang: langStore.getState()});
    },
    componentDidMount: function() {
        langStore.register(this.changeHandler);
    },
    render: function() {
        var lang   = this.state.lang;
        var levels = datas.map(function(level, idx) {
            return (
                <SponsorClass
                    key={idx} 
                    data={level}
                    lang={lang} />
            );
        });
        return (
            <section role="sponsor-list">
                {levels}
            </section>
        );
    }
});

var Main = React.createClass({
    render: function() {
        return (
            <div>
                <Navbar />

                <Sponsorlist />

                <Footer />
            </div>
        );
    }
});

ReactDOM.render(
    <Main />,
    document.getElementById('react-root')
)
