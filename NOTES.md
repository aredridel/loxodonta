Basics:

    host-meta
    webfinger
    atom with metadata

    Result: account can now be looked up.

Publishing statuses

    PuSH hub
    PuSH publisher
    Salmon notifier for replies and other mentions

Receving updates

    PuSH hub
    PuSH subscriber
    Salmon receiver

TODO:

    full instance usernames in the database maybe?
    Use JRD instead of XRD where possible
    webfinger CLI
    lrdd validator
    xrd validator
    add accept headers to mastodon impl for jrd

Design

    - internals of the app should focus on activitystreams 2.0 as much as possible, and JSON-LD where realistic.
    - XML processing should be pushed out into specific adaptors.
