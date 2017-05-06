const activityTypes = {
  Accept: {
    name: 'Accept',
    uri: `https://www.w3.org/ns/activitystreams#Accept`,
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally accepted an invitation to a party",
        "type": "Accept",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Invite",
          "actor": "http://john.example.org",
          "object": {
            "type": "Event",
            "name": "Going-Away Party for Jim"
          }
        }
      },
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally accepted Joe into the club",
        "type": "Accept",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Person",
          "name": "Joe"
        },
        "target": {
          "type": "Group",
          "name": "The Club"
        }
      }
    ],
    notes: "Indicates that the actor accepts the object. The target property can be used in certain circumstances to indicate the context into which the object has been accepted.",
    extends: "Activity",
  // Properties:	Inherits all properties from Activity.
  },
  TentativeAccept: {
    name: 'TentativeAccept',
    uri: `https://www.w3.org/ns/activitystreams#TentativeAccept`,
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally tentatively accepted an invitation to a party",
        "type": "TentativeAccept",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Invite",
          "actor": "http://john.example.org",
          "object": {
            "type": "Event",
            "name": "Going-Away Party for Jim"
          }
        }
      }
    ],
    notes: `A specialization of Accept indicating that the acceptance is tentative.`,
    extends: 'Accept'
  //Properties:	Inherits all properties from Accept.
  },
  Add: {
    name: 'Add',
    uri: `https://www.w3.org/ns/activitystreams#Add`,
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally added an object",
        "type": "Add",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": "http://example.org/abc"
      },
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally added a picture of her cat to her cat picture collection",
        "type": "Add",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Image",
          "name": "A picture of my cat",
          "url": "http://example.org/img/cat.png"
        },
        "origin": {
          "type": "Collection",
          "name": "Camera Roll"
        },
        "target": {
          "type": "Collection",
          "name": "My Cat Pictures"
        }
      }
    ],
    notes: "Indicates that the actor has added the object to the target. If the target property is not explicitly specified, the target would need to be determined implicitly by context. The origin can be used to identify the context from which the object originated.",
    extends: 'Activity',
  //Properties:	Inherits all properties from Activity.
  },
  Arrive: {
    name: 'Arrive',
    uri: `https://www.w3.org/ns/activitystreams#Arrive`,
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally arrived at work",
        "type": "Arrive",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "location": {
          "type": "Place",
          "name": "Work"
        },
        "origin": {
          "type": "Place",
          "name": "Home"
        }
      }
    ],
    notes: "An IntransitiveActivity that indicates that the actor has arrived at the location. The origin can be used to identify the context from which the actor originated. The target typically has no defined meaning.",
    extends: 'IntransitiveActivity',
  //Properties:	Inherits all properties fom IntransitiveActivity.
  },

  Create: {
    name: 'Create',
    uri: `https://www.w3.org/ns/activitystreams#Create`,
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally created a note",
        "type": "Create",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Note",
          "name": "A Simple Note",
          "content": "This is a simple note"
        }
      }
    ],
    notes: `Indicates that the actor has created the object.`,
    extends: 'Activity',
  //Properties:	Inherits all properties from Activity.
  },
  Delete: {
    name: 'Delete',
    uri: `https://www.w3.org/ns/activitystreams#Delete`,
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally deleted a note",
        "type": "Delete",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": "http://example.org/notes/1",
        "origin": {
          "type": "Collection",
          "name": "Sally's Notes"
        }
      }
    ],
    notes: `Indicates that the actor has deleted the object. If specified, the origin indicates the context from which the object was deleted.`,
    extends: 'Activity',
  //Properties:	Inherits all properties from Activity.
  },
  Follow: {
    name: 'Follow',
    uri: 'https://www.w3.org/ns/activitystreams#Follow',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally followed John",
        "type": "Follow",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Person",
          "name": "John"
        }
      }
    ],
    notes: `Indicates that the actor is "following" the object. Following is defined in the sense typically used within Social systems in which the actor is interested in any activity performed by or on the object. The target and origin typically have no defined meaning.`,
    extends: `Activity`,
  //Properties:	Inherits all properties from Activity.
  },

  Ignore: {
    name: 'Ignore',
    uri: 'https://www.w3.org/ns/activitystreams#Ignore',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally ignored a note",
        "type": "Ignore",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": "http://example.org/notes/1"
      }
    ],
    notes: `Indicates that the actor is ignoring the object. The target and origin typically have no defined meaning.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Join: {
    name: 'Join',
    uri: 'https://www.w3.org/ns/activitystreams#Join',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally joined a group",
        "type": "Join",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Group",
          "name": "A Simple Group"
        }
      }
    ],
    notes: `Indicates that the actor has joined the object. The target and origin typically have no defined meaning.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Leave: {
    name: 'Leave',
    uri: 'https://www.w3.org/ns/activitystreams#Leave',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally left work",
        "type": "Leave",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Place",
          "name": "Work"
        }
      },
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally left a group",
        "type": "Leave",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Group",
          "name": "A Simple Group"
        }
      }
    ],
    notes: `Indicates that the actor has left the object. The target and origin typically have no meaning.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Like: {
    name: 'Like',
    uri: 'https://www.w3.org/ns/activitystreams#Like',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally liked a note",
        "type": "Like",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": "http://example.org/notes/1"
      }
    ],
    notes: `Indicates that the actor likes, recommends or endorses the object. The target and origin typically have no defined meaning.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Offer: {
    name: 'Offer',
    uri: 'https://www.w3.org/ns/activitystreams#Offer',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally offered 50% off to Lewis",
        "type": "Offer",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "http://www.types.example/ProductOffer",
          "name": "50% Off!"
        },
        "target": {
          "type": "Person",
          "name": "Lewis"
        }
      }
    ],
    notes: `Indicates that the actor is offering the object. If specified, the target indicates the entity to which the object is being offered.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Invite: {
    name: 'Invite',
    uri: 'https://www.w3.org/ns/activitystreams#Invite',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally invited John and Lisa to a party",
        "type": "Invite",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Event",
          "name": "A Party"
        },
        "target": [
          {
            "type": "Person",
            "name": "John"
          },
          {
            "type": "Person",
            "name": "Lisa"
          }
        ]
      }
    ],
    notes: `A specialization of Offer in which the actor is extending an invitation for the object to the target.`,
    extends: 'Offer',
  // Properties:	Inherits all properties from Offer.
  },
  Reject: {
    name: 'Reject',
    uri: 'https://www.w3.org/ns/activitystreams#Reject',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally rejected an invitation to a party",
        "type": "Reject",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Invite",
          "actor": "http://john.example.org",
          "object": {
            "type": "Event",
            "name": "Going-Away Party for Jim"
          }
        }
      }
    ],
    notes: `Indicates that the actor is rejecting the object. The target and origin typically have no defined meaning.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  TentativeReject: {
    name: 'TentativeReject',
    uri: 'https://www.w3.org/ns/activitystreams#TentativeReject',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally tentatively rejected an invitation to a party",
        "type": "TentativeReject",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Invite",
          "actor": "http://john.example.org",
          "object": {
            "type": "Event",
            "name": "Going-Away Party for Jim"
          }
        }
      }
    ],
    notes: `A specialization of Reject in which the rejection is considered tentative.`,
    extends: 'Reject',
  // Properties:	Inherits all properties from Reject.
  },
  Remove: {
    name: 'Remove',
    uri: 'https://www.w3.org/ns/activitystreams#Remove',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally removed a note from her notes folder",
        "type": "Remove",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": "http://example.org/notes/1",
        "target": {
          "type": "Collection",
          "name": "Notes Folder"
        }
      },
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "The moderator removed Sally from a group",
        "type": "Remove",
        "actor": {
          "type": "http://example.org/Role",
          "name": "The Moderator"
        },
        "object": {
          "type": "Person",
          "name": "Sally"
        },
        "origin": {
          "type": "Group",
          "name": "A Simple Group"
        }
      }
    ],
    notes: `Indicates that the actor is removing the object. If specified, the origin indicates the context from which the object is being removed.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Undo: {
    name: 'Undo',
    uri: 'https://www.w3.org/ns/activitystreams#Undo',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally retracted her offer to John",
        "type": "Undo",
        "actor": "http://sally.example.org",
        "object": {
          "type": "Offer",
          "actor": "http://sally.example.org",
          "object": "http://example.org/posts/1",
          "target": "http://john.example.org"
        }
      }
    ],
    notes: `Indicates that the actor is undoing the object. In most cases, the object will be an Activity describing some previously performed action (for instance, a person may have previously "liked" an article but, for whatever reason, might choose to undo that like at some later point in time).

The target and origin typically have no defined meaning.`,

    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Update: {
    name: 'Update',
    uri: 'https://www.w3.org/ns/activitystreams#Update',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally updated her note",
        "type": "Update",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": "http://example.org/notes/1"
      }
    ],
    notes: `Indicates that the actor has updated the object. Note, however, that this vocabulary does not define a mechanism for describing the actual set of modifications made to object.

The target and origin typically have no defined meaning.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  View: {
    name: 'View',
    uri: 'https://www.w3.org/ns/activitystreams#View',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally read an article",
        "type": "View",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Article",
          "name": "What You Should Know About Activity Streams"
        }
      }
    ],
    notes: `Indicates that the actor has viewed the object.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Listen: {
    name: 'Listen',
    uri: 'https://www.w3.org/ns/activitystreams#Listen',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally listened to a piece of music",
        "type": "Listen",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": "http://example.org/music.mp3"
      }
    ],
    notes: `Indicates that the actor has listened to the object.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Read: {
    name: 'Read',
    uri: 'https://www.w3.org/ns/activitystreams#Read',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally read a blog post",
        "type": "Read",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": "http://example.org/posts/1"
      }
    ],
    notes: `Indicates that the actor has read the object.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Move: {
    name: 'Move',
    uri: 'https://www.w3.org/ns/activitystreams#Move',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally moved a post from List A to List B",
        "type": "Move",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": "http://example.org/posts/1",
        "target": {
          "type": "Collection",
          "name": "List B"
        },
        "origin": {
          "type": "Collection",
          "name": "List A"
        }
      }
    ],
    notes: `Indicates that the actor has moved object from origin to target. If the origin or target are not specified, either can be determined by context.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Travel: {
    name: 'Travel',
    uri: 'https://www.w3.org/ns/activitystreams#Travel',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally went home from work",
        "type": "Travel",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "target": {
          "type": "Place",
          "name": "Home"
        },
        "origin": {
          "type": "Place",
          "name": "Work"
        }
      }
    ],
    notes: `Indicates that the actor is traveling to target from origin. Travel is an IntransitiveObject whose actor specifies the direct object. If the target or origin are not specified, either can be determined by context.`,
    extends: 'IntransitiveActivity',
  // Properties:	Inherits all properties from IntransitiveActivity.
  },
  Announce: {
    name: 'Announce',
    uri: 'https://www.w3.org/ns/activitystreams#Announce',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally announced that she had arrived at work",
        "type": "Announce",
        "actor": {
          "type": "Person",
          "id": "http://sally.example.org",
          "name": "Sally"
        },
        "object": {
          "type": "Arrive",
          "actor": "http://sally.example.org",
          "location": {
            "type": "Place",
            "name": "Work"
          }
        }
      }
    ],
    notes: `Indicates that the actor is calling the target's attention the object.

The origin typically has no defined meaning.`,

    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Block: {
    name: 'Block',
    uri: 'https://www.w3.org/ns/activitystreams#Block',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally blocked Joe",
        "type": "Block",
        "actor": "http://sally.example.org",
        "object": "http://joe.example.org"
      }
    ],
    notes: `Indicates that the actor is blocking the object. Blocking is a stronger form of Ignore. The typical use is to support social systems that allow one user to block activities or content of other users. The target and origin typically have no defined meaning.`,
    extends: 'Ignore',
  // Properties:	Inherits all properties from Ignore.
  },
  Flag: {
    name: 'Flag',
    uri: 'https://www.w3.org/ns/activitystreams#Flag',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally flagged an inappropriate note",
        "type": "Flag",
        "actor": "http://sally.example.org",
        "object": {
          "type": "Note",
          "content": "An inappropriate note"
        }
      }
    ],
    notes: `Indicates that the actor is "flagging" the object. Flagging is defined in the sense common to many social platforms as reporting content as being inappropriate for any number of reasons.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Dislike: {
    name: 'Dislike',
    uri: 'https://www.w3.org/ns/activitystreams#Dislike',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally disliked a post",
        "type": "Dislike",
        "actor": "http://sally.example.org",
        "object": "http://example.org/posts/1"
      }
    ],
    notes: `Indicates that the actor dislikes the object.`,
    extends: 'Activity',
  // Properties:	Inherits all properties from Activity.
  },
  Question: {
    name: 'Question',
    uri: 'https://www.w3.org/ns/activitystreams#Question',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Question",
        "name": "What is the answer?",
        "oneOf": [
          {
            "type": "Note",
            "name": "Option A"
          },
          {
            "type": "Note",
            "name": "Option B"
          }
        ]
      },
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Question",
        "name": "What is the answer?",
        "closed": "2016-05-10T00:00:00Z"
      }
    ],
    notes: `Represents a question being asked. Question objects are an extension of IntransitiveActivity. That is, the Question object is an Activity, but the direct object is the question itself and therefore it would not contain an object property.

Either of the anyOf and oneOf properties may be used to express possible answers, but a Question object must not have both properties.`,

    extends: 'IntransitiveActivity',
    properties: [
      'oneOf', 'anyOf', 'closed'
    ]
  }
};

const actorTypes = {
  Application: {
    name: 'Application',
    uri: 'https://www.w3.org/ns/activitystreams#Application',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Application",
        "name": "Exampletron 3000"
      }],
    notes: `Describes a software application.`,
    extends: `Object`,
  },
  Group: {
    name: 'Group',
    uri: 'https://www.w3.org/ns/activitystreams#Group',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Group",
        "name": "Big Beards of Austin"
      }],
    notes: `Represents a formal or informal collective of Actors.`,
    extends: `Object`,
  },

  Organization: {
    name: 'Organization',
    uri: 'https://www.w3.org/ns/activitystreams#Organization',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Organization",
        "name": "Example Co."
      }],
    notes: `Represents an organization.`,
    extends: `Object`,
  },
  Person: {
    name: 'Person',
    uri: 'https://www.w3.org/ns/activitystreams#Person',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Person",
        "name": "Sally Smith"
      }],
    notes: `Represents an individual person.`,
    extends: `Object`,
  },
  Service: {
    name: 'Service',
    uri: 'https://www.w3.org/ns/activitystreams#Service',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Service",
        "name": "Acme Web Service"
      }],
    notes: `Represents a service of any kind.`,
    extends: `Object`,
  }
};

const objectAndLinkTypes = {
  Relationship: {
    name: 'Relationship',
    uri: 'https://www.w3.org/ns/activitystreams#Relationship',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally is an acquaintance of John",
        "type": "Relationship",
        "subject": {
          "type": "Person",
          "name": "Sally"
        },
        "relationship": "http://purl.org/vocab/relationship/acquaintanceOf",
        "object": {
          "type": "Person",
          "name": "John"
        }
      }],
    notes: `Describes a relationship between two individuals. The subject and object properties are used to identify the connected individuals.

See 5.2 Representing Relationships Between Entities for additional information.`,

    extends: `Object`,
    properties: [
      'subject', 'object', 'relationship'
    ],
  },

  Article: {
    name: 'Article',
    uri: 'https://www.w3.org/ns/activitystreams#Article',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Article",
        "name": "What a Crazy Day I Had",
        "content": "<div>... you will never believe ...</div>",
        "attributedTo": "http://sally.example.org"
      }],
    notes: `Represents any kind of multi-paragraph written work.`,
    extends: `Object`,
  },
  Document: {
    name: 'Document',
    uri: 'https://www.w3.org/ns/activitystreams#Document',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Document",
        "name": "4Q Sales Forecast",
        "url": "http://example.org/4q-sales-forecast.pdf"
      }],
    notes: `Represents a document of any kind.`,
    extends: `Object`,
  },
  Audio: {
    name: 'Audio',
    uri: 'https://www.w3.org/ns/activitystreams#Audio',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Audio",
        "name": "Interview With A Famous Technologist",
        "url": {
          "type": "Link",
          "href": "http://example.org/podcast.mp3",
          "mediaType": "audio/mp3"
        }
      }],
    notes: `Represents an audio document of any kind.`,
    extends: `Document`,
  },
  Image: {
    name: 'Image',
    uri: 'https://www.w3.org/ns/activitystreams#Image',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Image",
        "name": "Cat Jumping on Wagon",
        "url": [
          {
            "type": "Link",
            "href": "http://example.org/image.jpeg",
            "mediaType": "image/jpeg"
          },
          {
            "type": "Link",
            "href": "http://example.org/image.png",
            "mediaType": "image/png"
          }
        ]
      }],
    notes: `An image document of any kind`,
    extends: `Document`,
  },
  Video: {
    name: 'Video',
    uri: 'https://www.w3.org/ns/activitystreams#Video',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Video",
        "name": "Puppy Plays With Ball",
        "url": "http://example.org/video.mkv",
        "duration": "PT2H"
      }],
    notes: `Represents a video document of any kind.`,
    extends: `Document`,
  },
  Note: {
    name: 'Note',
    uri: 'https://www.w3.org/ns/activitystreams#Note',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Note",
        "name": "A Word of Warning",
        "content": "Looks like it is going to rain today. Bring an umbrella!"
      }],
    notes: `Represents a short written work typically less than a single paragraph in length.`,
    extends: `Object`,
  },
  Page: {
    name: 'Page',
    uri: 'https://www.w3.org/ns/activitystreams#Page',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Page",
        "name": "Omaha Weather Report",
        "url": "http://example.org/weather-in-omaha.html"
      }],
    notes: `Represents a Web Page.`,
    extends: `Document`,
  },
  Event: {
    name: 'Event',
    uri: 'https://www.w3.org/ns/activitystreams#Event',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Event",
        "name": "Going-Away Party for Jim",
        "startTime": "2014-12-31T23:00:00-08:00",
        "endTime": "2015-01-01T06:00:00-08:00"
      }],
    notes: `Represents any kind of event.`,
    extends: `Object`,
  },
  Place: {
    name: 'Place',
    uri: 'https://www.w3.org/ns/activitystreams#Place',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Place",
        "name": "Work"
      },
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Place",
        "name": "Fresno Area",
        "latitude": 36.75,
        "longitude": 119.7667,
        "radius": 15,
        "units": "miles"
      }],
    notes: `Represents a logical or physical location. See 5.3 Representing Places for additional information.`,
    extends: `Object`,
    properties: [
      'accuracy', 'altitude', 'latitude', 'longitude', 'radius', 'units'],
  },
  Mention: {
    name: 'Mention',
    uri: 'https://www.w3.org/ns/activitystreams#Mention',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Mention of Joe by Carrie in her note",
        "type": "Mention",
        "href": "http://example.org/joe",
        "name": "Joe"
      }],
    notes: `A specialized Link that represents an @mention.`,
    extends: `Link`,
  },
  Profile: {
    name: 'Profile',
    uri: 'https://www.w3.org/ns/activitystreams#Profile',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Profile",
        "summary": "Sally's Profile",
        "describes": {
          "type": "Person",
          "name": "Sally Smith"
        }
      }],
    notes: `A Profile is a content object that describes another Object, typically used to describe Actor Type objects. The describes property is used to reference the object being described by the profile.`,
    extends: `Object`,
    Properties: ['describes'],
  },

  Tombstone: {
    name: 'Tombstone',
    uri: 'https://www.w3.org/ns/activitystreams#Tombstone',
    examples: [
      {
        "type": "OrderedCollection",
        "totalItems": 3,
        "name": "Vacation photos 2016",
        "orderedItems": [
          {
            "type": "Image",
            "id": "http://image.example/1"
          },
          {
            "type": "Tombstone",
            "formerType": "Image",
            "id": "http://image.example/2",
            "deleted": "2016-03-17T00:00:00Z"
          },
          {
            "type": "Image",
            "id": "http://image.example/3"
          }
        ]
      }],
    notes: `A Tombstone represents a content object that has been deleted. It can be used in Collections to signify that there used to be an object at this position, but it has been deleted.`,
    extends: `Object`,
    properties: ['formerType', 'deleted'],
  },
}

const coreTypes = {
  Object: {
    name: 'Object',
    uri: 'https://www.w3.org/ns/activitystreams#Object',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Object",
        "id": "http://www.test.example/object/1",
        "name": "A Simple, non-specific object"
      }],
    notes: `Describes an object of any kind. The Object type serves as the base type for most of the other kinds of objects defined in the Activity Vocabulary, including other Core types such as Activity, IntransitiveActivity, Collection and OrderedCollection.`,
    disjoint: 'Link',
    properties: [
      'attachment', 'attributedTo', 'audience', 'content', 'context', 'name', 'endTime', 'generator', 'icon', 'image', 'inReplyTo', 'location', 'preview', 'published', 'replies', 'startTime', 'summary', 'tag', 'updated', 'url', 'to', 'bto', 'cc', 'bcc', 'mediaType', 'duration'
    ]
  },

  Link: {
    name: 'Link',
    uri: 'https://www.w3.org/ns/activitystreams#Link',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Link",
        "href": "http://example.org/abc",
        "hreflang": "en",
        "mediaType": "text/html",
        "name": "An example link"
      }],
    notes: `A Link is an indirect, qualified reference to a resource identified by a URL. The fundamental model for links is established by [ RFC5988]. Many of the properties defined by the Activity Vocabulary allow values that are either instances of Object or Link. When a Link is used, it establishes a qualified relation connecting the subject (the containing object) to the resource identified by the href. Properties of the Link are properties of the reference as opposed to properties of the resource.`,
    disjoint: `Object`,
    properties: [
      'href', 'rel', 'mediaType', 'name', 'hreflang', 'height', 'width', 'preview'],
  },
  Activity: {
    name: 'Activity',
    uri: 'https://www.w3.org/ns/activitystreams#Activity',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Activity",
        "summary": "Sally did something to a note",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": {
          "type": "Note",
          "name": "A Note"
        }
      }],
    notes: `An Activity is a subtype of Object that describes some form of action that may happen, is currently happening, or has already happened. The Activity type itself serves as an abstract base type for all types of activities. It is important to note that the Activity type itself does not carry any specific semantics about the kind of action being taken.`,
    extends: `Object`,
    properties: [
      'actor', 'object', 'target', 'result', 'origin', 'instrument'
    ],
  },
  IntransitiveActivity: {
    name: 'IntransitiveActivity',
    uri: 'https://www.w3.org/ns/activitystreams#IntransitiveActivity',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Travel",
        "summary": "Sally went to work",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "target": {
          "type": "Place",
          "name": "Work"
        }
      }],
    notes: `Instances of IntransitiveActivity are a subtype of Activity representing intransitive actions. The object property is therefore inappropriate for these activities.`,
    extends: `Activity`,
  },

  Collection: {
    name: 'Collection',
    uri: 'https://www.w3.org/ns/activitystreams#Collection',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally's notes",
        "type": "Collection",
        "totalItems": 2,
        "items": [
          {
            "type": "Note",
            "name": "A Simple Note"
          },
          {
            "type": "Note",
            "name": "Another Simple Note"
          }
        ]
      }],
    notes: `A Collection is a subtype of Object that represents ordered or unordered sets of Object or Link instances.

Refer to the Activity Streams 2.0 Core specification for a complete description of the Collection type.`,

    extends: `Object`,
    properties: ['totalItems', 'current', 'first', 'last', 'items'],
  },
  OrderedCollection: {
    name: 'OrderedCollection',
    uri: 'https://www.w3.org/ns/activitystreams#OrderedCollection',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally's notes",
        "type": "OrderedCollection",
        "totalItems": 2,
        "orderedItems": [
          {
            "type": "Note",
            "name": "A Simple Note"
          },
          {
            "type": "Note",
            "name": "Another Simple Note"
          }
        ]
      }],
    notes: `A subtype of Collection in which members of the logical collection are assumed to always be strictly ordered.`,

    extends: `Collection`,
  },

  CollectionPage: {
    name: 'CollectionPage',
    uri: 'https://www.w3.org/ns/activitystreams#CollectionPage',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Page 1 of Sally's notes",
        "type": "CollectionPage",
        "id": "http://example.org/foo?page=1",
        "partOf": "http://example.org/foo",
        "items": [
          {
            "type": "Note",
            "name": "A Simple Note"
          },
          {
            "type": "Note",
            "name": "Another Simple Note"
          }
        ]
      }],
    notes: `Used to represent distinct subsets of items from a Collection. Refer to the Activity Streams 2.0 Core for a complete description of the CollectionPage object.`,

    extends: `Collection`,
    properties: ['partOf', 'next', 'prev'],

  },
  OrderedCollectionPage: {
    name: 'OrderedCollectionPage',
    uri: 'https://www.w3.org/ns/activitystreams#OrderedCollectionPage',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Page 1 of Sally's notes",
        "type": "OrderedCollectionPage",
        "id": "http://example.org/foo?page=1",
        "partOf": "http://example.org/foo",
        "orderedItems": [
          {
            "type": "Note",
            "name": "A Simple Note"
          },
          {
            "type": "Note",
            "name": "Another Simple Note"
          }
        ]
      }],
    notes: `Used to represent ordered subsets of items from an OrderedCollection. Refer to the Activity Streams 2.0 Core for a complete description of the OrderedCollectionPage object.`,

    extends: ['OrderedCollection', 'CollectionPage'],
    properties: [
      'startIndex'
    ]
  }
};

const allTypes = Object.assign({}, coreTypes, activityTypes, actorTypes, objectAndLinkTypes)

const byURI = Object.keys(allTypes).reduce((a, e) => (a[allTypes[e].uri] = allTypes[e], a), {});

const properties = {
  id: {
    uri: '@id',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "name": "Foo",
        "id": "http://example.org/foo"
      }],
    notes: `Provides the globally unique identifier for an Object or Link.`,
    domain: [`Object`, `Link`],
    range: `anyURI`,
    functional: `True`,
  },
  type: {
    uri: '@type',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "A foo",
        "type": "http://example.org/Foo"
      }],
    notes: `Identifies the Object or Link type. Multiple values may be specified.`,
    domain: `Object | Link`,
    range: `anyURI`,
  },
  actor: {
    uri: 'https://www.w3.org/ns/activitystreams#actor',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally offered the Foo object",
        "type": "Offer",
        "actor": "http://sally.example.org",
        "object": "http://example.org/foo"
      },
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally offered the Foo object",
        "type": "Offer",
        "actor": {
          "type": "Person",
          "id": "http://sally.example.org",
          "summary": "Sally"
        },
        "object": "http://example.org/foo"
      },
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally and Joe offered the Foo object",
        "type": "Offer",
        "actor": [
          "http://joe.example.org",
          {
            "type": "Person",
            "id": "http://sally.example.org",
            "name": "Sally"
          }
        ],
        "object": "http://example.org/foo"
      }],
    notes: `Describes one or more entities that either performed or are expected to perform the activity. Any single activity can have multiple actors. The actor may be specified using an indirect Link.`,
    domain: `Activity`,
    range: [`Object`, `Link`],
    subpropertyOf: 'attributedTo',
  },
  attachment: {
    uri: 'https://www.w3.org/ns/activitystreams#attachment',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Note",
        "name": "Have you seen my cat?",
        "attachment": [
          {
            "type": "Image",
            "content": "This is what he looks like.",
            "url": "http://example.org/cat.jpeg"
          }
        ]
      }],
    notes: `Identifies a resource attached or related to an object that potentially requires special handling. The intent is to provide a model that is at least semantically similar to attachments in email.`,
    domain: `Object`,
    range: [`Object`, `Link`],
  },
  attributedTo: {
    uri: 'https://www.w3.org/ns/activitystreams#attributedTo',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Image",
        "name": "My cat taking a nap",
        "url": "http://example.org/cat.jpeg",
        "attributedTo": [
          {
            "type": "Person",
            "name": "Sally"
          }
        ]
      },
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Image",
        "name": "My cat taking a nap",
        "url": "http://example.org/cat.jpeg",
        "attributedTo": [
          "http://joe.example.org",
          {
            "type": "Person",
            "name": "Sally"
          }
        ]
      }
    ],
    notes: `Identifies one or more entities to which this object is attributed. The attributed entities might not be Actors. For instance, an object might be attributed to the completion of another activity.`,
    domain: [`Link`, `Object`],
    range: [`Link`, `Object`],
  },
  audience: {
    uri: 'https://www.w3.org/ns/activitystreams#audience',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "name": "Holiday announcement",
        "type": "Note",
        "content": "Thursday will be a company-wide holiday. Enjoy your day off!",
        "audience": {
          "type": "http://example.org/Organization",
          "name": "ExampleCo LLC"
        }
      }],
    notes: `Identifies one or more entities that represent the total population of entities for which the object can considered to be relevant.`,
    domain: `Object`,
    range: [`Object`, `Link`],
  },
  bcc: {
    uri: 'https://www.w3.org/ns/activitystreams#bcc',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally offered a post to John",
        "type": "Offer",
        "actor": "http://sally.example.org",
        "object": "http://example.org/posts/1",
        "target": "http://john.example.org",
        "bcc": ["http://joe.example.org"]
      }],
    notes: `Identifies one or more Objects that are part of the private secondary audience of this Object.`,
    domain: `Object`,
    range: [`Object`, `Link`],
  },
  bto: {
    uri: 'https://www.w3.org/ns/activitystreams#bto',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally offered a post to John",
        "type": "Offer",
        "actor": "http://sally.example.org",
        "object": "http://example.org/posts/1",
        "target": "http://john.example.org",
        "bto": ["http://joe.example.org"]
      }],
    notes: `Identifies an Object that is part of the private primary audience of this Object.`,
    domain: `Object`,
    range: [`Object`, `Link`,]
  },
  cc: {
    uri: 'https://www.w3.org/ns/activitystreams#cc',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally offered a post to John",
        "type": "Offer",
        "actor": "http://sally.example.org",
        "object": "http://example.org/posts/1",
        "target": "http://john.example.org",
        "cc": ["http://joe.example.org"]
      }],
    notes: `Identifies an Object that is part of the public secondary audience of this Object.`,
    domain: `Object`,
    range: [`Object`, `Link`,]
  },
  context: {
    uri: 'https://www.w3.org/ns/activitystreams#context',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Activities in context 1",
        "type": "Collection",
        "items": [
          {
            "type": "Offer",
            "actor": "http://sally.example.org",
            "object": "http://example.org/posts/1",
            "target": "http://john.example.org",
            "context": "http://example.org/contexts/1"
          },
          {
            "type": "Like",
            "actor": "http://joe.example.org",
            "object": "http://example.org/posts/2",
            "context": "http://example.org/contexts/1"
          }
        ]
      }],
    notes: `Identifies the context within which the object exists or an activity was performed.

The notion of "context" used is intentionally vague. The intended function is to serve as a means of grouping objects and activities that share a common originating context or purpose. An example could be all activities relating to a common project or event.`,

    domain: `Object`,
    range: [`Object`, `Link`,]
  },
  current: {
    uri: 'https://www.w3.org/ns/activitystreams#current',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally's blog posts",
        "type": "Collection",
        "totalItems": 3,
        "current": "http://example.org/collection",
        "items": [
          "http://example.org/posts/1",
          "http://example.org/posts/2",
          "http://example.org/posts/3"
        ]
      }
      ,
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally's blog posts",
        "type": "Collection",
        "totalItems": 3,
        "current": {
          "type": "Link",
          "summary": "Most Recent Items",
          "href": "http://example.org/collection"
        },
        "items": [
          "http://example.org/posts/1",
          "http://example.org/posts/2",
          "http://example.org/posts/3"
        ]
      }],
    notes: `In a paged Collection, indicates the page that contains the most recently updated member items.`,
    domain: `Collection`,
    range: [`CollectionPage`, `Link`],
    functional: `True`,
  },
  first: {
    uri: 'https://www.w3.org/ns/activitystreams#first',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally's blog posts",
        "type": "Collection",
        "totalItems": 3,
        "first": "http://example.org/collection?page=0"
      }
      ,
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally's blog posts",
        "type": "Collection",
        "totalItems": 3,
        "first": {
          "type": "Link",
          "summary": "First Page",
          "href": "http://example.org/collection?page=0"
        }
      }],
    notes: `In a paged Collection, indicates the furthest preceeding page of items in the collection.`,
    domain: `Collection`,
    range: [`CollectionPage`, `Link`],
    functional: `True`,
  },
  generator: {
    uri: 'https://www.w3.org/ns/activitystreams#generator',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "A simple note",
        "type": "Note",
        "content": "This is all there is.",
        "generator": {
          "type": "Application",
          "name": "Exampletron 3000"
        }
      }],
    notes: `Identifies the entity (e.g. an application) that generated the object.`,
    domain: `Object`,
    range: [`Object`, `Link`],
  },
  icon: {
    uri: 'https://www.w3.org/ns/activitystreams#icon',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "A simple note",
        "type": "Note",
        "content": "This is all there is.",
        "icon": {
          "type": "Image",
          "name": "Note icon",
          "url": "http://example.org/note.png",
          "width": 16,
          "height": 16
        }
      }
      ,
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "A simple note",
        "type": "Note",
        "content": "A simple note",
        "icon": [
          {
            "type": "Image",
            "summary": "Note (16x16)",
            "url": "http://example.org/note1.png",
            "width": 16,
            "height": 16
          },
          {
            "type": "Image",
            "summary": "Note (32x32)",
            "url": "http://example.org/note2.png",
            "width": 32,
            "height": 32
          }
        ]
      }],
    notes: `Indicates an entity that describes an icon for this object. The image should have an aspect ratio of one (horizontal) to one (vertical) and should be suitable for presentation at a small size.`,
    domain: `Object`,
    range: [`Image`, `Link`],
  },
  image: {
    uri: 'https://www.w3.org/ns/activitystreams#image',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "name": "A simple note",
        "type": "Note",
        "content": "This is all there is.",
        "image": {
          "type": "Image",
          "name": "A Cat",
          "url": "http://example.org/cat.png"
        }
      }
      ,
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "name": "A simple note",
        "type": "Note",
        "content": "This is all there is.",
        "image": [
          {
            "type": "Image",
            "name": "Cat 1",
            "url": "http://example.org/cat1.png"
          },
          {
            "type": "Image",
            "name": "Cat 2",
            "url": "http://example.org/cat2.png"
          }
        ]
      }],
    notes: `Indicates an entity that describes an image for this object. Unlike the icon property, there are no aspect ratio or display size limitations assumed.`,
    domain: `Object`,
    range: [`Image`, `Link`],
  },
  inReplyTo: {
    uri: 'https://www.w3.org/ns/activitystreams#inReplyTo',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "A simple note",
        "type": "Note",
        "content": "This is all there is.",
        "inReplyTo": {
          "summary": "Previous note",
          "type": "Note",
          "content": "What else is there?"
        }
      }
      ,
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "A simple note",
        "type": "Note",
        "content": "This is all there is.",
        "inReplyTo": "http://example.org/posts/1"
      }],
    notes: `Indicates one or more entities for which this object is considered a response.`,
    domain: `Object`,
    range: [`Object`, `Link`],
  },
  instrument: {
    uri: 'https://www.w3.org/ns/activitystreams#instrument',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally listened to a piece of music on the Acme Music Service",
        "type": "Listen",
        "actor": {
          "type": "Person",
          "name": "Sally"
        },
        "object": "http://example.org/foo.mp3",
        "instrument": {
          "type": "Service",
          "name": "Acme Music Service"
        }
      }],
    notes: `Identifies one or more objects used (or to be used) in the completion of an Activity.`,
    domain: `Activity`,
    range: [`Object`, `Link`],
  },
  last: {
    uri: 'https://www.w3.org/ns/activitystreams#last',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "A collection",
        "type": "Collection",
        "totalItems": 3,
        "last": "http://example.org/collection?page=1"
      }
      ,
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "A collection",
        "type": "Collection",
        "totalItems": 5,
        "last": {
          "type": "Link",
          "summary": "Last Page",
          "href": "http://example.org/collection?page=1"
        }
      }],
    notes: `In a paged Collection, indicates the furthest proceeding page of the collection.`,
    domain: `Collection`,
    range: [`CollectionPage`, `Link`],
    functional: `True`,
  },
  location: {
    uri: 'https://www.w3.org/ns/activitystreams#location',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Person",
        "name": "Sally",
        "location": {
          "name": "Over the Arabian Sea, east of Socotra Island Nature Sanctuary",
          "type": "Place",
          "longitude": 12.34,
          "latitude": 56.78,
          "altitude": 90,
          "units": "m"
        }
      }],
    notes: `Indicates one or more physical or logical locations associated with the object.`,
    domain: `Object`,
    range: [`Object`, `Link`],
  },
  items: {
    uri: 'https://www.w3.org/ns/activitystreams#items',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally's notes",
        "type": "Collection",
        "totalItems": 2,
        "items": [
          {
            "type": "Note",
            "name": "Reminder for Going-Away Party"
          },
          {
            "type": "Note",
            "name": "Meeting 2016-11-17"
          }
        ]
      }
      ,
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally's notes",
        "type": "OrderedCollection",
        "totalItems": 2,
        "orderedItems": [
          {
            "type": "Note",
            "name": "Meeting 2016-11-17"
          },
          {
            "type": "Note",
            "name": "Reminder for Going-Away Party"
          }
        ]
      }],
    notes: `Identifies the items contained in a collection. The items might be ordered or unordered.`,
    domain: `Collection`,
    range: [`Object`, `Link`, `Array<Object>`, `Array<Link>`],
  },
  oneOf: {
    uri: 'https://www.w3.org/ns/activitystreams#oneOf',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Question",
        "name": "What is the answer?",
        "oneOf": [
          {
            "type": "Note",
            "name": "Option A"
          },
          {
            "type": "Note",
            "name": "Option B"
          }
        ]
      }],
    notes: `Identifies an exclusive option for a Question. Use of oneOf implies that the Question can have only a single answer. To indicate that a Question can have multiple answers, use anyOf.`,
    domain: `Question`,
    range: [`Object`, `Link`],
  },
  anyOf: {
    uri: 'https://www.w3.org/ns/activitystreams#anyOf',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Question",
        "name": "What is the answer?",
        "anyOf": [
          {
            "type": "Note",
            "name": "Option A"
          },
          {
            "type": "Note",
            "name": "Option B"
          }
        ]
      }],
    notes: `Identifies an inclusive option for a Question. Use of anyOf implies that the Question can have multiple answers. To indicate that a Question can have only one answer, use oneOf.`,
    domain: `Question`,
    range: [`Object`, `Link`],
  },
  closed: {
    uri: 'https://www.w3.org/ns/activitystreams#closed',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Question",
        "name": "What is the answer?",
        "closed": "2016-05-10T00:00:00Z"
      }],
    notes: `Indicates that a question has been closed, and answers are no longer accepted.`,
    domain: `Question`,
    range: [`Object`, `Link`, `xsd:dateTime`, `xsd:boolean`],
  },
  origin: {
    uri: 'https://www.w3.org/ns/activitystreams#origin',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally moved a post from List A to List B",
        "type": "Move",
        "actor": "http://sally.example.org",
        "object": "http://example.org/posts/1",
        "target": {
          "type": "Collection",
          "name": "List B"
        },
        "origin": {
          "type": "Collection",
          "name": "List A"
        }
      }],
    notes: `Describes an indirect object of the activity from which the activity is directed. The precise meaning of the origin is the object of the English preposition "from". For instance, in the activity "John moved an item to List B from List A", the origin of the activity is "List A".`,
    domain: `Activity`,
    range: [`Object`, `Link`],
  },
  next: {
    uri: 'https://www.w3.org/ns/activitystreams#next',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Page 2 of Sally's blog posts",
        "type": "CollectionPage",
        "next": "http://example.org/collection?page=2",
        "items": [
          "http://example.org/posts/1",
          "http://example.org/posts/2",
          "http://example.org/posts/3"
        ]
      }
      ,
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Page 2 of Sally's blog posts",
        "type": "CollectionPage",
        "next": {
          "type": "Link",
          "name": "Next Page",
          "href": "http://example.org/collection?page=2"
        },
        "items": [
          "http://example.org/posts/1",
          "http://example.org/posts/2",
          "http://example.org/posts/3"
        ]
      }],
    notes: `In a paged Collection, indicates the next page of items.`,
    domain: `CollectionPage`,
    range: [`CollectionPage`, `Link`],
    functional: `True`,
  },
  object: {
    uri: 'https://www.w3.org/ns/activitystreams#object',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally liked a post",
        "type": "Like",
        "actor": "http://sally.example.org",
        "object": "http://example.org/posts/1"
      }
      ,
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Like",
        "actor": "http://sally.example.org",
        "object": {
          "type": "Note",
          "content": "A simple note"
        }
      },
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally liked a note",
        "type": "Like",
        "actor": "http://sally.example.org",
        "object": [
          "http://example.org/posts/1",
          {
            "type": "Note",
            "summary": "A simple note",
            "content": "That is a tree."
          }
        ]
      }],
    notes: `When used within an Activity, describes the direct object of the activity. For instance, in the activity "John added a movie to his wishlist", the object of the activity is the movie added.

When used within a Relationship describes the entity to which the subject is related.`,

    domain: [`Activity`, `Relationship`],
    range: [`Object`, `Link`],
  },
  prev: {
    uri: 'https://www.w3.org/ns/activitystreams#prev',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Page 1 of Sally's blog posts",
        "type": "CollectionPage",
        "prev": "http://example.org/collection?page=1",
        "items": [
          "http://example.org/posts/1",
          "http://example.org/posts/2",
          "http://example.org/posts/3"
        ]
      }
      ,
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Page 1 of Sally's blog posts",
        "type": "CollectionPage",
        "prev": {
          "type": "Link",
          "name": "Previous Page",
          "href": "http://example.org/collection?page=1"
        },
        "items": [
          "http://example.org/posts/1",
          "http://example.org/posts/2",
          "http://example.org/posts/3"
        ]
      }],
    notes: `In a paged Collection, identifies the previous page of items.`,
    domain: `CollectionPage`,
    range: [`CollectionPage`, `Link`],
    functional: `True`,
  },
  preview: {
    uri: 'https://www.w3.org/ns/activitystreams#preview',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Video",
        "name": "Cool New Movie",
        "duration": "PT2H30M",
        "preview": {
          "type": "Video",
          "name": "Trailer",
          "duration": "PT1M",
          "url": {
            "href": "http://example.org/trailer.mkv",
            "mediaType": "video/mkv"
          }
        }
      }],
    notes: `Identifies an entity that provides a preview of this object.`,
    domain: [`Link`, `Object`],
    range: [`Link`, `Object`],
  },
  result: {
    uri: 'https://www.w3.org/ns/activitystreams#result',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally checked that her flight was on time",
        "type": ["Activity", "http://www.verbs.example/Check"],
        "actor": "http://sally.example.org",
        "object": "http://example.org/flights/1",
        "result": {
          "type": "http://www.types.example/flightstatus",
          "name": "On Time"
        }
      }],
    notes: `Describes the result of the activity. For instance, if a particular action results in the creation of a new resource, the result property can be used to describe that new resource.`,
    domain: `Activity`,
    range: [`Object`, `Link`],
  },
  replies: {
    uri: 'https://www.w3.org/ns/activitystreams#replies',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "A simple note",
        "type": "Note",
        "id": "http://www.test.example/notes/1",
        "content": "I am fine.",
        "replies": {
          "type": "Collection",
          "totalItems": 1,
          "items": [
            {
              "summary": "A response to the note",
              "type": "Note",
              "content": "I am glad to hear it.",
              "inReplyTo": "http://www.test.example/notes/1"
            }
          ]
        }
      }],
    notes: `Identifies a Collection containing objects considered to be responses to this object.`,
    domain: `Object`,
    range: `Collection`,
    functional: `True`,
  },
  tag: {
    uri: 'https://www.w3.org/ns/activitystreams#tag',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Image",
        "summary": "Picture of Sally",
        "url": "http://example.org/sally.jpg",
        "tag": [
          {
            "type": "Person",
            "id": "http://sally.example.org",
            "name": "Sally"
          }
        ]
      }],
    notes: `One or more "tags" that have been associated with an objects. A tag can be any kind of Object. The key difference between attachment and tag is that the former implies association by inclusion, while the latter implies associated by reference.`,
    domain: `Object`,
    range: [`Object`, `Link`],
  },
  target: {
    uri: 'https://www.w3.org/ns/activitystreams#target',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally offered the post to John",
        "type": "Offer",
        "actor": "http://sally.example.org",
        "object": "http://example.org/posts/1",
        "target": "http://john.example.org"
      }
      ,
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally offered the post to John",
        "type": "Offer",
        "actor": "http://sally.example.org",
        "object": "http://example.org/posts/1",
        "target": {
          "type": "Person",
          "name": "John"
        }
      }],
    notes: `Describes the indirect object, or target, of the activity. The precise meaning of the target is largely dependent on the type of action being described but will often be the object of the English preposition "to". For instance, in the activity "John added a movie to his wishlist", the target of the activity is John's wishlist. An activity can have more than one target.`,
    domain: `Activity`,
    range: [`Object`, `Link`],
  },
  to: {
    uri: 'https://www.w3.org/ns/activitystreams#to',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally offered the post to John",
        "type": "Offer",
        "actor": "http://sally.example.org",
        "object": "http://example.org/posts/1",
        "target": "http://john.example.org",
        "to": ["http://joe.example.org"]
      }],
    notes: `Identifies an entity considered to be part of the public primary audience of an Object`,
    domain: `Object`,
    range: [`Object`, `Link`],
  },
  url: {
    uri: 'https://www.w3.org/ns/activitystreams#url',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Document",
        "name": "4Q Sales Forecast",
        "url": "http://example.org/4q-sales-forecast.pdf"
      }
      ,
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Document",
        "name": "4Q Sales Forecast",
        "url": {
          "type": "Link",
          "href": "http://example.org/4q-sales-forecast.pdf"
        }
      }
      ,
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Document",
        "name": "4Q Sales Forecast",
        "url": [
          {
            "type": "Link",
            "href": "http://example.org/4q-sales-forecast.pdf",
            "mediaType": "application/pdf"
          },
          {
            "type": "Link",
            "href": "http://example.org/4q-sales-forecast.html",
            "mediaType": "text/html"
          }
        ]
      }],
    notes: `Identifies one or more links to representations of the object`,
    domain: `Object`,
    range: [`xsd:anyURI`, `Link`],
  },
  accuracy: {
    uri: 'https://www.w3.org/ns/activitystreams#accuracy',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "name": "Liu Gu Lu Cun, Pingdu, Qingdao, Shandong, China",
        "type": "Place",
        "latitude": 36.75,
        "longitude": 119.7667,
        "accuracy": 94.5
      }],
    notes: `Indicates the accuracy of position coordinates on a Place objects. Expressed in properties of percentage. e.g. "94.0" means "94.0% accurate".`,
    domain: `Place`,
    range: `xsd:float [>= 0.0f, <= 100.0f]`,
    functional: `True`,
  },
  altitude: {
    uri: 'https://www.w3.org/ns/activitystreams#altitude',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Place",
        "name": "Fresno Area",
        "altitude": 15.0,
        "latitude": 36.75,
        "longitude": 119.7667,
        "units": "miles"
      }],
    notes: `Indicates the altitude of a place. The measurement units is indicated using the units property. If units is not specified, the default is assumed to be "m" indicating meters.`,
    domain: `Object`,
    range: `xsd:float`,
    functional: `True`,
  },
  content: {
    uri: 'https://www.w3.org/ns/activitystreams#content',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "A simple note",
        "type": "Note",
        "content": "A <em>simple</em> note"
      },

      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "A simple note",
        "type": "Note",
        "contentMap": {
          "en": "A <em>simple</em> note",
          "es": "Una nota <em>sencilla</em>",
          "zh-Hans": "一段<em>简单的</em>笔记"
        }
      }
      ,
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "A simple note",
        "type": "Note",
        "mediaType": "text/markdown",
        "content": "## A simple note\nA simple markdown `note`"
      }],
    notes: `The content or textual representation of the Object encoded as a JSON string. By default, the value of content is HTML. The mediaType property can be used in the object to indicate a different content type.

The content may be expressed using multiple language-tagged values.`,

    domain: `Object`,
    range: [`xsd:string`, `rdf:langString`],
  },
  name: {
    uri: 'https://www.w3.org/ns/activitystreams#name',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Note",
        "name": "A simple note"
      }
      ,
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Note",
        "nameMap": {
          "en": "A simple note",
          "es": "Una nota sencilla",
          "zh-Hans": "一段简单的笔记"
        }
      }],
    notes: `A simple, human-readable, plain-text name for the object. HTML markup must not be included. The name may be expressed using multiple language-tagged values.`,
    domain: [`Object`, `Link`],
    range: [`xsd:string`, `rdf:langString`],
  },
  duration: {
    uri: 'https://www.w3.org/ns/activitystreams#duration',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Video",
        "name": "Birds Flying",
        "url": "http://example.org/video.mkv",
        "duration": "PT2H"
      }],
    notes: `When the object describes a time-bound resource, such as an audio or video, a meeting, etc, the duration property indicates the object's approximate duration. The value must be expressed as an xsd:duration as defined by [ xmlschema11-2], section 3.3.6 (e.g. a period of 5 seconds is represented as "PT5S").`,
    domain: `Object`,
    range: `xsd:duration`,
    functional: `True`,
  },
  height: {
    uri: 'https://www.w3.org/ns/activitystreams#height',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Link",
        "href": "http://example.org/image.png",
        "height": 100,
        "width": 100
      }],
    notes: `On a Link, specifies a hint as to the rendering height in device-independent pixels of the linked resource.`,
    domain: `Link`,
    range: `xsd:nonNegativeInteger`,
    functional: `True`,
  },
  href: {
    uri: 'https://www.w3.org/ns/activitystreams#href',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Link",
        "href": "http://example.org/abc",
        "mediaType": "text/html",
        "name": "Previous"
      }],
    notes: `The target resource pointed to by a Link.`,
    domain: `Link`,
    range: `xsd:anyURI`,
    functional: `True`,
  },
  hreflang: {
    uri: 'https://www.w3.org/ns/activitystreams#hreflang',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Link",
        "href": "http://example.org/abc",
        "hreflang": "en",
        "mediaType": "text/html",
        "name": "Previous"
      }],
    notes: `Hints as to the language used by the target resource. Value must be a [BCP47] Language-Tag.`,
    domain: `Link`,
    range: `[BCP47] Language Tag`,
    functional: `True`,
  },
  partOf: {
    uri: 'https://www.w3.org/ns/activitystreams#partOf',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Page 1 of Sally's notes",
        "type": "CollectionPage",
        "id": "http://example.org/collection?page=1",
        "partOf": "http://example.org/collection",
        "items": [
          {
            "type": "Note",
            "name": "Pizza Toppings to Try"
          },
          {
            "type": "Note",
            "name": "Thought about California"
          }
        ]
      }],
    notes: `Identifies the Collection to which a CollectionPage objects items belong.`,
    domain: `CollectionPage`,
    range: [`Link`, `Collection`],
    functional: `True`,
  },
  latitude: {
    uri: 'https://www.w3.org/ns/activitystreams#latitude',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Place",
        "name": "Fresno Area",
        "latitude": 36.75,
        "longitude": 119.7667,
        "radius": 15,
        "units": "miles"
      }],
    notes: `The latitude of a place`,
    domain: `Place`,
    range: `xsd:float`,
    functional: `True`,
  },
  longitude: {
    uri: 'https://www.w3.org/ns/activitystreams#longitude',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Place",
        "name": "Fresno Area",
        "latitude": 36.75,
        "longitude": 119.7667,
        "radius": 15,
        "units": "miles"
      }],
    notes: `The longitude of a place`,
    domain: `Place`,
    range: `xsd:float`,
    functional: `True`,
  },
  mediaType: {
    uri: 'https://www.w3.org/ns/activitystreams#mediaType',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Link",
        "href": "http://example.org/abc",
        "hreflang": "en",
        "mediaType": "text/html",
        "name": "Next"
      }],
    notes: `When used on a Link, identifies the MIME media type of the referenced resource.

When used on an Object, identifies the MIME media type of the value of the content property. If not specified, the content property is assumed to contain text/html content.`,

    domain: [`Link`, `Object`],
    range: `MIME Media Type`,
    functional: `True`,
  },
  endTime: {
    uri: 'https://www.w3.org/ns/activitystreams#endTime',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Event",
        "name": "Going-Away Party for Jim",
        "startTime": "2014-12-31T23:00:00-08:00",
        "endTime": "2015-01-01T06:00:00-08:00"
      }],
    notes: `The date and time describing the actual or expected ending time of the object. When used with an Activity object, for instance, the endTime property specifies the moment the activity concluded or is expected to conclude.`,
    domain: `Object`,
    range: `xsd:dateTime`,
    functional: `True`,
  },
  published: {
    uri: 'https://www.w3.org/ns/activitystreams#published',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "A simple note",
        "type": "Note",
        "content": "Fish swim.",
        "published": "2014-12-12T12:12:12Z"
      }],
    notes: `The date and time at which the object was published`,
    domain: `Object`,
    range: `xsd:dateTime`,
    functional: `True`,
  },
  startTime: {
    uri: 'https://www.w3.org/ns/activitystreams#startTime',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Event",
        "name": "Going-Away Party for Jim",
        "startTime": "2014-12-31T23:00:00-08:00",
        "endTime": "2015-01-01T06:00:00-08:00"
      }],
    notes: `The date and time describing the actual or expected starting time of the object. When used with an Activity object, for instance, the startTime property specifies the moment the activity began or is scheduled to begin.`,
    domain: `Object`,
    range: `xsd:dateTime`,
    functional: `True`,
  },
  radius: {
    uri: 'https://www.w3.org/ns/activitystreams#radius',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Place",
        "name": "Fresno Area",
        "latitude": 36.75,
        "longitude": 119.7667,
        "radius": 15,
        "units": "miles"
      }],
    notes: `The radius from the given latitude and longitude for a Place. The units is expressed by the units property. If units is not specified, the default is assumed to be "m" indicating "meters".`,
    domain: `Place`,
    range: `xsd:float [>= 0.0f]`,
    functional: `True`,
  },
  rel: {
    uri: 'https://www.w3.org/ns/activitystreams#rel',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Link",
        "href": "http://example.org/abc",
        "hreflang": "en",
        "mediaType": "text/html",
        "name": "Preview",
        "rel": ["canonical", "preview"]
      }],
    notes: `A link relation associated with a Link. The value must conform to both the [HTML5] and [RFC5988] "link relation" definitions.

In the [HTML5], any string not containing the "space" U+0020, "tab" (U+0009), "LF" (U+000A), "FF" (U+000C), "CR" (U+000D) or "," (U+002C) characters can be used as a valid link relation.`,

    domain: `Link`,
    range: `[RFC5988] or [HTML5] Link Relation`,
  },
  startIndex: {
    uri: 'https://www.w3.org/ns/activitystreams#startIndex',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Page 1 of Sally's notes",
        "type": "OrderedCollectionPage",
        "startIndex": 0,
        "orderedItems": [
          {
            "type": "Note",
            "name": "Density of Water"
          },
          {
            "type": "Note",
            "name": "Air Mattress Idea"
          }
        ]
      }],
    notes: `A non-negative integer value identifying the relative position within the logical view of a strictly ordered collection.`,
    domain: `OrderedCollectionPage`,
    range: `xsd:nonNegativeInteger`,
    functional: `True`,
  },
  summary: {
    uri: 'https://www.w3.org/ns/activitystreams#summary',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "name": "Cane Sugar Processing",
        "type": "Note",
        "summary": "A simple <em>note</em>"
      }
      ,
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "name": "Cane Sugar Processing",
        "type": "Note",
        "summaryMap": {
          "en": "A simple <em>note</em>",
          "es": "Una <em>nota</em> sencilla",
          "zh-Hans": "一段<em>简单的</em>笔记"
        }
      }],
    notes: `A natural language summarization of the object encoded as HTML. Multiple language tagged summaries may be provided.`,
    domain: `Object`,
    range: [`xsd:string`, `rdf:langString`],
  },
  totalItems: {
    uri: 'https://www.w3.org/ns/activitystreams#totalItems',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally's notes",
        "type": "Collection",
        "totalItems": 2,
        "items": [
          {
            "type": "Note",
            "name": "Which Staircase Should I Use"
          },
          {
            "type": "Note",
            "name": "Something to Remember"
          }
        ]
      }],
    notes: `A non-negative integer specifying the total number of objects contained by the logical view of the collection. This number might not reflect the actual number of items serialized within the Collection object instance.`,
    domain: `Collection`,
    range: `xsd:nonNegativeInteger`,
    functional: `True`,
  },
  units: {
    uri: 'https://www.w3.org/ns/activitystreams#units',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Place",
        "name": "Fresno Area",
        "latitude": 36.75,
        "longitude": 119.7667,
        "radius": 15,
        "units": "miles"
      }],
    notes: `Specifies the measurement units for the radius and altitude properties on a Place object. If not specified, the default is assumed to be "m" for "meters".`,
    domain: `Place`,
    range: [`"cm"`, `"feet"`, `"inches"`, `"km"`, `"m"`, `"miles"`, `xsd:anyURI`],
    functional: `True`,
  },
  updated: {
    uri: 'https://www.w3.org/ns/activitystreams#updated',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "name": "Cranberry Sauce Idea",
        "type": "Note",
        "content": "Mush it up so it does not have the same shape as the can.",
        "updated": "2014-12-12T12:12:12Z"
      }],
    notes: `The date and time at which the object was updated`,
    domain: `Object`,
    range: `xsd:dateTime`,
    functional: `True`,
  },
  width: {
    uri: 'https://www.w3.org/ns/activitystreams#width',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "type": "Link",
        "href": "http://example.org/image.png",
        "height": 100,
        "width": 100
      }],
    notes: `On a Link, specifies a hint as to the rendering width in device-independent pixels of the linked resource.`,
    domain: `Link`,
    range: `xsd:nonNegativeInteger`,
    functional: `True`,
  },
  subject: {
    uri: 'https://www.w3.org/ns/activitystreams#subject',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally is an acquaintance of John's",
        "type": "Relationship",
        "subject": {
          "type": "Person",
          "name": "Sally"
        },
        "relationship": "http://purl.org/vocab/relationship/acquaintanceOf",
        "object": {
          "type": "Person",
          "name": "John"
        }
      }],
    notes: `On a Relationship object, the subject property identifies one of the connected individuals. For instance, for a Relationship object describing "John is related to Sally", subject would refer to John.`,
    domain: `Relationship`,
    range: [`Link`, `Object`],
    functional: `True`,
  },
  relationship: {
    uri: 'https://www.w3.org/ns/activitystreams#relationship',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally is an acquaintance of John's",
        "type": "Relationship",
        "subject": {
          "type": "Person",
          "name": "Sally"
        },
        "relationship": "http://purl.org/vocab/relationship/acquaintanceOf",
        "object": {
          "type": "Person",
          "name": "John"
        }
      }],
    notes: `On a Relationship object, the relationship property identifies the kind of relationship that exists between subject and object.`,
    domain: `Relationship`,
    range: `Object`,
  },
  describes: {
    uri: 'https://www.w3.org/ns/activitystreams#describes',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "Sally's profile",
        "type": "Profile",
        "describes": {
          "type": "Person",
          "name": "Sally"
        },
        "url": "http://sally.example.org"
      }],
    notes: `On a Profile object, the describes property identifies the object described by the Profile.`,
    domain: `Profile`,
    range: `Object`,
    functional: `True`,
  },
  formerType: {
    uri: 'https://www.w3.org/ns/activitystreams#formerType',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "This image has been deleted",
        "type": "Tombstone",
        "formerType": "Image",
        "url": "http://example.org/image/2"
      }],
    notes: `On a Tombstone object, the formerType property identifies the type of the object that was deleted.`,
    domain: `Tombstone`,
    range: `Object`,
    functional: `False`,
  },
  deleted: {
    uri: 'https://www.w3.org/ns/activitystreams#deleted',
    examples: [
      {
        "@context": "https://www.w3.org/ns/activitystreams",
        "summary": "This image has been deleted",
        "type": "Tombstone",
        "deleted": "2016-05-03T00:00:00Z"
      }],
    notes: `On a Tombstone object, the deleted property is a timestamp for when the object was deleted.`,
    domain: `Tombstone`,
    range: `xsd:dateTime`,
    functional: `True`,
  }
};

module.exports = {
  properties,
  coreTypes,
  activityTypes,
  actorTypes,
  objectAndLinkTypes,
  allTypes,
  byURI
};
